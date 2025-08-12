import * as THREE from 'three';

/**
 * @author alteredq / http://alteredqualia.com/
 */

class EffectComposer {
	constructor( renderer, renderTarget ) {
		this.renderer = renderer;
		this.renderTarget1 = renderTarget;

		if ( this.renderTarget1 === undefined ) {
			this.renderTarget1 = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
			this.renderTarget1.texture.name = 'EffectComposer.rt1';
		}

		this.renderTarget2 = this.renderTarget1.clone();
		this.renderTarget2.texture.name = 'EffectComposer.rt2';

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		this.renderToScreen = true;

		this.passes = [];

		// dependencies
		if ( THREE.CopyShader === undefined ) {
			console.error( 'THREE.EffectComposer relies on THREE.CopyShader' );
		}

		if ( THREE.ShaderPass === undefined ) {
			console.error( 'THREE.EffectComposer relies on THREE.ShaderPass' );
		}

		this.copyPass = new ShaderPass( CopyShader );
		this.clock = new THREE.Clock();
	}

	swapBuffers() {
		const tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;
	}

	addPass( pass ) {
		this.passes.push( pass );
		pass.setSize( this.renderer.domElement.width, this.renderer.domElement.height );
	}

	insertPass( pass, index ) {
		this.passes.splice( index, 0, pass );
		pass.setSize( this.renderer.domElement.width, this.renderer.domElement.height );
	}

	removePass( pass ) {
		const index = this.passes.indexOf( pass );
		if ( index !== - 1 ) {
			this.passes.splice( index, 1 );
		}
	}

	isLastEnabledPass( passIndex ) {
		for ( let i = passIndex + 1; i < this.passes.length; i ++ ) {
			if ( this.passes[ i ].enabled ) {
				return false;
			}
		}
		return true;
	}

	render( deltaTime ) {
		// deltaTime value is in seconds
		if ( deltaTime === undefined ) {
			deltaTime = this.clock.getDelta();
		}

		const currentRenderTarget = this.renderer.getRenderTarget();

		let maskActive = false;

		for ( let i = 0, il = this.passes.length; i < il; i ++ ) {
			const pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.renderToScreen = ( this.renderToScreen && this.isLastEnabledPass( i ) );
			pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );

			if ( pass.needsSwap ) {
				if ( maskActive ) {
					const context = this.renderer.getContext();
					const stencil = this.renderer.state.buffers.stencil;

					//context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
					stencil.setFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );

					//context.stencilFunc( context.EQUAL, 1, 0xffffffff );
					stencil.setFunc( context.EQUAL, 1, 0xffffffff );
				}

				this.swapBuffers();
			}

			if ( THREE.MaskPass !== undefined ) {
				if ( pass instanceof MaskPass ) {
					maskActive = true;
				} else if ( pass instanceof ClearMaskPass ) {
					maskActive = false;
				}
			}
		}

		this.renderer.setRenderTarget( currentRenderTarget );
	}

	reset( renderTarget ) {
		if ( renderTarget === undefined ) {
			const size = this.renderer.getSize( new THREE.Vector2() );
			this._pixelRatio = this.renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );
		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;
	}

	setSize( width, height ) {
		this._width = width;
		this._height = height;

		const effectiveWidth = this._width * this._pixelRatio;
		const effectiveHeight = this._height * this._pixelRatio;

		this.renderTarget1.setSize( effectiveWidth, effectiveHeight );
		this.renderTarget2.setSize( effectiveWidth, effectiveHeight );

		for ( let i = 0; i < this.passes.length; i ++ ) {
			this.passes[ i ].setSize( effectiveWidth, effectiveHeight );
		}
	}

	setPixelRatio( pixelRatio ) {
		this._pixelRatio = pixelRatio;
		this.setSize( this._width, this._height );
	}

	dispose() {
		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.copyPass.dispose();
	}
}

// Pass classes
class Pass {
	constructor() {
		this.enabled = true;
		this.needsSwap = true;
		this.clear = false;
		this.renderToScreen = false;
	}

	setSize( /* width, height */ ) {}

	render( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {
		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );
	}

	dispose() {}
}

class RenderPass extends Pass {
	constructor( scene, camera, overrideMaterial, clearColor, clearAlpha ) {
		super();

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;
		this._oldClearColor = new THREE.Color();
	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		let oldClearAlpha, oldOverrideMaterial;

		if ( this.overrideMaterial !== undefined ) {
			oldOverrideMaterial = this.scene.overrideMaterial;
			this.scene.overrideMaterial = this.overrideMaterial;
		}

		if ( this.clearColor ) {
			renderer.getClearColor( this._oldClearColor );
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );
		}

		if ( this.clearDepth ) {
			renderer.clearDepth();
		}

		renderer.setRenderTarget( this.renderToScreen ? null : writeBuffer );

		if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
		renderer.render( this.scene, this.camera );

		if ( this.clearColor ) {
			renderer.setClearColor( this._oldClearColor, oldClearAlpha );
		}

		if ( this.overrideMaterial !== undefined ) {
			this.scene.overrideMaterial = oldOverrideMaterial;
		}

		renderer.autoClear = oldAutoClear;
	}
}

class ShaderPass extends Pass {
	constructor( shader, textureID ) {
		super();

		this.textureID = ( textureID !== undefined ) ? textureID : 'tDiffuse';

		if ( shader instanceof THREE.ShaderMaterial ) {
			this.uniforms = shader.uniforms;
			this.material = shader;
		} else if ( shader ) {
			this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );
			this.material = new THREE.ShaderMaterial( {
				defines: Object.assign( {}, shader.defines ),
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader
			} );
		}

		this.fsQuad = new FullScreenQuad( this.material );
	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
		if ( this.uniforms[ this.textureID ] ) {
			this.uniforms[ this.textureID ].value = readBuffer.texture;
		}

		this.fsQuad.material = this.material;

		if ( this.renderToScreen ) {
			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );
		} else {
			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			this.fsQuad.render( renderer );
		}
	}

	dispose() {
		this.material.dispose();
		this.fsQuad.dispose();
	}
}

class FullScreenQuad {
	constructor( material ) {
		this._mesh = new THREE.Mesh( FullScreenQuad.geometry, material );
	}

	dispose() {
		this._mesh.geometry.dispose();
	}

	render( renderer ) {
		renderer.render( this._mesh, FullScreenQuad.camera );
	}

	get material() {
		return this._mesh.material;
	}

	set material( value ) {
		this._mesh.material = value;
	}
}

FullScreenQuad.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
FullScreenQuad.geometry = new THREE.PlaneGeometry( 2, 2 );

// Copy Shader
const CopyShader = {
	uniforms: {
		'tDiffuse': { value: null },
		'opacity': { value: 1.0 }
	},

	vertexShader: `
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: `
		uniform float opacity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		void main() {
			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;
		}`
};

export { EffectComposer, RenderPass, ShaderPass, Pass, CopyShader };
