export const roseaiMonitorContentEn = `
<h1 style="text-align: center;">RoseAI: Precision Agriculture at the Edge</h1>
<p class="subtitle" style="text-align: center; font-size: 1.5em; color: #666; margin-bottom: 2rem;">Smart Rose Crop Monitoring with VineCam and Hailo-8L</p>

<h2>The Challenge in Floriculture</h2>

<p>In the heart of Cayambe, Ecuador, at an altitude of 2800 meters, daily monitoring of rose growth and phenological stages is a critical task. Traditionally, identifying the transition from a closed bud to an open flower on a massive scale requires exhaustive, error-prone manual observation.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_water_culture_landscape.png" alt="Crop landscape in Cayambe" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>The Edge AI Solution: VineCam System</h2>

<p>To solve this challenge, we implemented the <strong>RoseAI Monitor</strong>, an edge-AI computer vision system that automates field tracking. The architecture is built on the <strong>Hellbender VineCam</strong> ecosystem, specifically designed for harsh agricultural environments.</p>

<p>The field network is distributed using a <strong>10BASE-T1S daisy-chain topology</strong>. This innovation allows multiple 11.9 MP cameras to be connected using a single twisted pair that transmits both data and power (48V DC). This drastically reduces cabling costs and simplifies greenhouse installation.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/cayambe_greenhouse_ai_monitoring.png" alt="AI Monitoring in greenhouse" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>Brain at the Edge: Hailo-8L</h2>

<p>The magic happens in the central server (a Raspberry Pi 5 node) equipped with a <strong>Hailo-8L</strong> accelerator. Instead of sending hundreds of high-resolution images to the cloud, inference is executed locally.</p>

<ul>
  <li><strong>Performance:</strong> 13 TOPS of neural processing with minimal energy consumption (around 5W).</li>
  <li><strong>Data Sovereignty:</strong> Images never leave the crop, ensuring privacy and reducing monthly cloud costs to zero ($0/mo vs $200+ in typical cloud solutions).</li>
  <li><strong>Real-Time Metrics:</strong> The system automatically identifies two core classes (<code>rose_small</code> for buds and <code>rose_large</code> for open flowers), calculating the blooming ratio to generate precise harvest alerts.</li>
</ul>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/lidar-botanical-rose-plate.jpg" alt="Phenotypic analysis of roses" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<h2>The Future of Phenotyping</h2>

<p>With this technical pipeline, RoseAI doesn't just count flowers; it opens the door to multidimensional crop analysis. Continuous monitoring allows us to project metrics into a broader phenomics hyperspace, detecting growth variations before they are visible to the naked eye.</p>

<img src="https://raw.githubusercontent.com/joseandresmillan/node_services/main/images/phenomics-hyperspace.png" alt="Phenomics hyperspace" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

<p>By combining industrial hardware, local inference acceleration, and computational analysis, RoseAI demonstrates how Artificial Intelligence is redefining the boundaries of precision agriculture.</p>
`;