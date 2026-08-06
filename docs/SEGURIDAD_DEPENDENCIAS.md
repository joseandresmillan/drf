# Seguridad de dependencias

Estado de las alertas de Dependabot y criterios aplicados.
Ultima revision: **2026-08-06** (115 alertas abiertas -> ~52 tras esta actualizacion).

---

## 1. El bypass de autenticacion de djoser (alerta high, **no alcanzable aqui**)

`djoser==2.2.3` tenia un **bypass de autenticacion**: cuando la funcion `authenticate()`
falla, djoser caia en una consulta directa a la base de datos, saltandose los
`AUTHENTICATION_BACKENDS` configurados y cualquier comprobacion personalizada
(2FA, LDAP, validaciones propias). Parcheado en **2.3.0**.

**Este proyecto no estaba expuesto a esa vulnerabilidad.** El codigo vulnerable vive en
`djoser.serializers.TokenCreateSerializer`, que solo usa `TokenCreateView`, y esa vista
solo se monta desde `djoser.urls.authtoken`. [core/urls.py:47-48](../core/urls.py#L47-L48)
incluye unicamente:

- `djoser.urls` -> el router de `users` (`/auth/users/...`)
- `djoser.urls.jwt` -> vistas de **simplejwt** (`TokenObtainPairView`, etc.)

Verificado sobre el mapa de URLs real de la aplicacion: no existe ninguna ruta
`token/login`. Una peticion a `/auth/token/login/` cae en el catch-all del SPA de React
([core/urls.py:106](../core/urls.py#L106)) y devuelve 405, no llega a djoser.
Ademas `TOKEN_MODEL: None` en [core/settings.py:187](../core/settings.py#L187) desactiva
el flujo de tokens DRF.

La actualizacion se aplica igualmente: cierra la alerta y elimina el riesgo de que montar
`djoser.urls.authtoken` en el futuro reintroduzca el problema.

**Lo que si era un problema real:** el venv local tenia `djoser 2.3.3` pero
`requirements.txt` fijaba `2.2.3`. Como el [Dockerfile](../Dockerfile) instala desde
`requirements.txt`, **produccion y desarrollo corrian versiones distintas de la libreria
de autenticacion**. Esa desincronizacion es la razon de la regla operativa del punto 4.

---

## 2. Paquetes actualizados

### Python (`requirements.txt`)

| Paquete | Antes | Ahora | Motivo |
|---|---|---|---|
| `djoser` | 2.2.3 | 2.3.3 | Bypass de autenticacion (high, no alcanzable aqui — ver punto 1) |
| `pillow` | 12.2.0 | 12.3.0 | 13 alertas: escritura fuera de limites en `Image.paste()`/`crop()`/`RankFilter`, decompression bombs. Alcanzable via `ImageField` en [apps/blog/models.py:38](../apps/blog/models.py#L38) y [apps/cases/models.py:10](../apps/cases/models.py#L10) |
| `cryptography` | 47.0.0 | 50.0.0 | 4 alertas, incluida una copia vulnerable de OpenSSL dentro de los wheels |
| `PyJWT` | 2.12.1 | 2.13.0 | 5 alertas: tokens HS256 forjados, bypass del allow-list de algoritmos |
| `Django` | 6.0.4 | 6.0.8 | Reutilizacion de conexion SMTP tras fallo de STARTTLS, entre otras |
| `djangorestframework-simplejwt` | 5.3.1 | 5.5.1 | Improper privilege management |
| `idna` | 3.13 | 3.18 | Bypass del fix de CVE-2024-3651 |

### JavaScript (`package.json`)

| Paquete | Antes | Ahora | Motivo |
|---|---|---|---|
| `axios` | 1.15.2 | 1.19.0 | 18 alertas: bypass de `NO_PROXY`, prototype pollution, bypass de `maxBodyLength`. **Es la unica de estas que corre en el navegador del usuario final.** |
| `react-router-dom` | 6.30.3 | 6.30.4 | Cierra 2 de 5 alertas (ver punto 3) |

---

## 3. Riesgos evaluados y aceptados

No todas las alertas aplican a esta aplicacion. Estas se dejan abiertas de forma
**consciente**, con la justificacion registrada aqui para no repetir el analisis:

### 3.1. La cadena de build de `react-scripts 5.0.1` (~45 alertas, incluidas las 2 criticas)

`webpack-dev-server`, `shell-quote`, `postcss`, `svgo`, `nth-check`, `ws`,
`websocket-driver`, `brace-expansion`, `serialize-javascript`, `js-yaml`, `jest`/`jsdom`,
`workbox`, `@babel/*`...

**Por que no aplican:** son dependencias de *build* y de *test*. Ninguna llega al bundle
que Django sirve desde `build/`. En produccion el
[Dockerfile](../Dockerfile) compila el frontend en una etapa aparte (`node:18`) y solo
copia el resultado estatico; `webpack-dev-server` ni siquiera se ejecuta.

**Por que no se parchean:** `react-scripts 5.0.1` fija estas transitivas. Ejecutar
`npm audit fix --force` degrada `react-scripts` y **rompe el build del Dockerfile**.
Forzarlas con `overrides` en `package.json` es posible pero arriesgado para un beneficio
de seguridad nulo en runtime.

> **Solucion definitiva (tarea futura, fuera de este cambio):** `react-scripts` esta sin
> mantenimiento desde hace anios. Migrar el frontend a **Vite** elimina toda esta clase de
> alertas de una vez. Es la unica salida permanente.

### 3.2. react-router (4 alertas restantes)

- *Arbitrary Constructor Injection via `deserializeErrors()`* -> requiere **SSR**. La app
  usa `<BrowserRouter>` en cliente, sin renderizado en servidor.
- *Open redirect en redirecciones same-origin* -> requiere el **data router**
  (`createBrowserRouter`, loaders/actions). El codigo usa solo la API declarativa
  `<BrowserRouter>` + `Routes`/`Route`.
- *Open redirect via backslash en `<Link>` y `useNavigate`* -> requiere un destino de
  navegacion **controlado por el usuario**. Ningun `navigate()` ni `to=` del proyecto
  toma valores de query string o de input del usuario (verificado sobre los 27 archivos
  que importan `react-router-dom`).

El unico parche completo esta en **react-router v7**, un cambio major que afectaria a esos
27 archivos. No se justifica para vulnerabilidades no explotables aqui.

---

## 4. Regla operativa: como mantener `requirements.txt`

`requirements.txt` contenia ~20 paquetes que la aplicacion Django **nunca importa**
(`mcp`, `mcp-server-time`, `starlette`, `sse-starlette`, `uvicorn`, `httpx`, `pydantic*`,
`jsonschema*`, `python-multipart`, `git-filter-repo`...). Eran restos de un `pip freeze`
hecho sobre un venv contaminado con herramientas ajenas al proyecto.

Esos paquetes por si solos generaban **15 alertas de Dependabot** y se instalaban en la
imagen de produccion sin cumplir ninguna funcion. Ya estan eliminados.

Al mismo tiempo **faltaban** dependencias que djoser 2.3.x si necesita
(`social-auth-app-django`, `social-auth-core`, `requests`, `oauthlib`), por lo que el arbol
de dependencias del contenedor no coincidia con el del venv local.

### Reglas

1. **No regenerar `requirements.txt` con `pip freeze`** sobre un venv compartido con
   herramientas que no son del proyecto.
2. Anadir solo **dependencias directas** en su seccion, con version fijada (`==`).
3. Las transitivas van en la seccion `--- Transitivas ---`, tambien fijadas.
4. Tras cualquier cambio, validar el cierre completo de dependencias:
   ```bash
   pip install --dry-run --ignore-installed -r requirements.txt
   ```
   Si aparece un paquete que no esta fijado en el archivo, hay que anadirlo.

---

## 5. Verificacion realizada

```bash
# 1. Resolucion limpia: 35 paquetes, todos fijados, sin conflictos
pip install --dry-run --ignore-installed -r requirements.txt

# 2. Django arranca con el nuevo conjunto (venv limpio)
python manage.py check          # -> System check identified no issues (0 silenced)

# 3. Frontend compila
npm install --legacy-peer-deps
npm run build                   # -> build folder is ready to be deployed
```

### Endpoints de autenticacion (ejecutado sobre BD de test, 9/9 correctos)

| Caso | Resultado |
|---|---|
| `POST /auth/jwt/create/` credenciales validas | 200 + `access` y `refresh` |
| `POST /auth/jwt/create/` password incorrecta | 401 |
| `GET /auth/users/me/` sin token | 401 |
| `GET /auth/users/me/` con `Authorization: JWT <token>` | 200 + payload del usuario |
| `POST /auth/jwt/refresh/` | 200 |
| `POST /auth/jwt/verify/` | 200 |
| `AUTHENTICATION_BACKENDS` que deniega a todos -> `jwt/create` | 401, sin fallback a BD |

La ultima fila es la prueba de regresion del bypass: con un backend que rechaza a todo el
mundo, el login falla en lugar de caer en una consulta directa a la base de datos.

### Subida de imagenes con Pillow 12.3.0 (ejecutado, 7/7 correctos)

| Caso | Resultado |
|---|---|
| `Case.image` guardado y dimensiones legibles | OK, 120x90 en disco |
| `BlogPost.image` guardado y dimensiones legibles | OK, 64x64 |
| ModelForm (ruta del admin) con PNG valido | aceptado, PIL lo decodifica |
| ModelForm con archivo que no es imagen | rechazado: "Adjunte una imagen valida" |

> Nota: la verificacion del contenido la hace `forms.ImageField` via PIL, que es la ruta del
> admin y de los serializers. El `full_clean()` del modelo **no** abre el archivo, asi que un
> `save()` directo desde codigo no valida que sea una imagen real. Comportamiento estandar de
> Django, no una regresion.

### Build e imagen de Docker (ejecutado)

```bash
docker compose build --no-cache web    # -> Built, sin errores
```

- `pip install -r requirements.txt` sobre `python:3.12-slim` instala **exactamente los 35
  paquetes fijados**, ninguno de mas.
- Todo se instala desde wheels precompilados (`cryptography-50.0.0-cp311-abi3-manylinux_2_34_x86_64.whl`,
  `pillow-12.3.0-cp312-cp312-manylinux_2_28_x86_64.whl`). **Nada compila desde sdist**, asi
  que el build no se alarga.
- El contenedor arranca: `collectstatic` copia 171 archivos, gunicorn levanta 2 workers y
  `GET /health/` responde `200 OK - Django is running!`.
- Las rutas de `/auth/` resuelven correctamente dentro de la imagen.

> **Observacion ajena a este cambio:** `start.sh` ejecuta `collectstatic` pero **no ejecuta
> `migrate`**, y `.dockerignore` excluye `db.sqlite3`. En una imagen recien construida
> cualquier acceso a la BD devuelve `no such table: auth_user`. En produccion la base tiene
> que venir de un volumen persistente. No es una regresion de esta actualizacion, pero
> conviene tenerlo presente.

---

## 6. Consultar el estado actual

```bash
gh api repos/joseandresmillan/drf/dependabot/alerts --paginate \
  -q '[.[] | select(.state=="open")] | length'

# Desglose por paquete
gh api repos/joseandresmillan/drf/dependabot/alerts --paginate \
  -q '.[] | select(.state=="open") | "\(.security_advisory.severity)\t\(.dependency.package.name)"' \
  | sort | uniq -c | sort -rn
```
