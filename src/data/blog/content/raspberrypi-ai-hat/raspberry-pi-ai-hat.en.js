export const raspberryPiAiHatContentEn = `
<h1 style="text-align:center";>Supercharging the Raspberry Pi 5</h1>
<p class="subtitle" style="text-align: center; font-size: 1.5em; color: #666; margin-bottom: 2rem;">A Deep Dive into the Hailo-8L AI Coprocessor</p>

<h2>The New Era of Edge AI</h2>

<p><strong>Edge AI</strong> means running artificial intelligence algorithms locally on a device, right where data is collected. This avoids sending data to a remote cloud server for processing.</p>

<p>The <strong>Raspberry Pi AI HAT</strong> with Hailo-8L chip represents a quantum leap in democratizing artificial intelligence, bringing data-center class performance to a small, affordable, and power-efficient platform.</p>

<h2>☁️ Cloud AI vs. 🖥️ Edge AI</h2>

<p>Understanding the difference is fundamental to appreciating the power of the Hailo-8L:</p>

<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Cloud AI</th>
      <th>Edge AI (Pi 5 + Hailo-8L)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>⚡ Latency</strong></td>
      <td>High (dependent on network)</td>
      <td><strong>Very Low</strong> (instant, on-device)</td>
    </tr>
    <tr>
      <td><strong>🔒 Privacy</strong></td>
      <td>Lower (sensitive data is sent off-site)</td>
      <td><strong>High</strong> (data never leaves the device)</td>
    </tr>
    <tr>
      <td><strong>📡 Bandwidth</strong></td>
      <td>High (requires constant data upload)</td>
      <td><strong>Very Low</strong> (only results are sent, if any)</td>
    </tr>
    <tr>
      <td><strong>🛡️ Reliability</strong></td>
      <td>Lower (requires stable internet)</td>
      <td><strong>High</strong> (works completely offline)</td>
    </tr>
    <tr>
      <td><strong>💰 Costs</strong></td>
      <td>Subscriptions and usage fees</td>
      <td><strong>No recurring costs</strong></td>
    </tr>
  </tbody>
</table>

<h2>🔧 The Hardware: A Perfect Match</h2>

<h3>📟 Raspberry Pi 5</h3>
<ul>
  <li><strong>CPU:</strong> 2.4GHz quad-core 64-bit Arm Cortex-A76</li>
  <li><strong>GPU:</strong> VideoCore VII GPU</li>
  <li><strong>RAM:</strong> 4GB or 8GB LPDDR4X</li>
  <li><strong>🔑 Key Feature:</strong> A <strong>PCIe 3.0 x1 interface</strong>. This high-speed connection is what allows the Pi to communicate effectively with the Hailo-8L accelerator.</li>
</ul>

<h3>🚀 Hailo-8L AI Accelerator</h3>
<ul>
  <li><strong>Form Factor:</strong> M.2 Key-M</li>
  <li><strong>Performance:</strong> Up to <strong>13 TOPS</strong> (Tera-Operations Per Second)</li>
  <li><strong>Power Efficiency:</strong> Averages only 2.5W</li>
  <li><strong>Purpose:</strong> A specialized chip built from the ground up to run neural networks efficiently, delivering data-center performance in a tiny package.</li>
</ul>

<h2>🤔 Why Use a Dedicated AI Coprocessor?</h2>

<h3>🧠 CPU vs. Hailo-8L for AI Tasks</h3>

<p>A CPU is a generalist, but AI workloads are specialist tasks involving millions of repetitive math calculations. A dedicated Neural Processing Unit (NPU) like the Hailo-8L is built specifically for this job.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div>
    <h4>⚠️ Running AI on the CPU</h4>
    <ul>
      <li>High CPU utilization (can reach 100%)</li>
      <li>Slower inference speeds (low frames per second)</li>
      <li>Consumes more power for the same task</li>
      <li>System becomes unresponsive as the CPU is bogged down</li>
    </ul>
  </div>
  <div>
    <h4>✅ Offloading AI to Hailo-8L</h4>
    <ul>
      <li>Very low CPU utilization (often < 5%)</li>
      <li>Massively faster inference speeds (real-time performance)</li>
      <li>Extremely power efficient (high TOPS/Watt)</li>
      <li>Frees up the CPU for the OS and other application logic</li>
    </ul>
  </div>
</div>

<h2>💡 What Can You Do With It? Applications</h2>

<p>This powerful combination enables sophisticated AI applications right at the edge.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div>
    <h3>🏢 Commercial & Industrial</h3>
    <ul>
      <li><strong>🏙️ Smart Cities:</strong> Real-time traffic analysis, license plate recognition, and smart parking</li>
      <li><strong>🛒 Retail Analytics:</strong> Anonymous customer tracking for heatmaps, shelf stock monitoring, and queue management</li>
      <li><strong>🏭 Industrial Automation:</strong> Visual quality control on assembly lines, safety gear detection, and predictive maintenance alerts</li>
    </ul>
  </div>
  <div>
    <h3>🏠 Home & Hobbyist</h3>
    <ul>
      <li><strong>🔐 Advanced Home Security:</strong> On-device person, package, and vehicle detection without subscription fees</li>
      <li><strong>🤖 Robotics & Drones:</strong> Autonomous navigation and intelligent object recognition for personal projects</li>
      <li><strong>🎨 Creative Projects:</strong> Real-time gesture recognition interfaces, smart wildlife cameras that identify species, and more</li>
    </ul>
  </div>
</div>

<h2>🚀 Getting Started: Easy Installation</h2>

<h3>Native Raspberry Pi OS Repositories</h3>

<p>Thanks to the partnership between Raspberry Pi and Hailo, the necessary software is included directly in the Raspberry Pi OS repositories. This makes installation incredibly simple.</p>

<h3>📋 System Requirements</h3>
<ul>
  <li>✅ Raspberry Pi 5 (4GB or 8GB RAM recommended)</li>
  <li>✅ Raspberry Pi AI HAT (with Hailo-8L chip)</li>
  <li>✅ MicroSD card (32GB minimum)</li>
  <li>✅ Power supply (5V/5A USB-C)</li>
  <li>✅ Raspberry Pi OS (Bookworm or later)</li>
</ul>

<h3>🔧 Step 1: Update Your System</h3>

<p>First, ensure your system is up to date to get the latest packages and ensure compatibility.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>sudo apt update
sudo apt full-upgrade -y</code>
  </div>
</div>

<h3>📦 Step 2: Install the Hailo Software Stack</h3>

<p>This single command installs the driver, runtime libraries, firmware, and other tools.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>sudo apt install hailo-all
sudo reboot</code>
  </div>
</div>

<h3>⚙️ Step 3: Enable PCIe Interface and Reboot</h3>

<p>This will enable the PCIe x1 interface at gen 3.0 speeds.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>sudo raspi-config
# Select Advanced Options
# Select PCIe speed
# Select 'Yes' and press enter
# Select 'Finished' and reboot when prompted</code>
  </div>
</div>

<h2>Running the Hailo Examples</h2>

<h3>📥 Step 4: Clone the Hailo Applications Repo</h3>

<p>Hailo provides a GitHub repository with a wide range of pre-built examples that are ready to run. Clone this repository to your home directory.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>git clone https://github.com/hailo-ai/hailo-rpi5-examples.git</code>
  </div>
</div>

<h3>🎯 Step 5: Run an Object Detection Demo</h3>

<p>Navigate into the directory and run a real-time object detection demo for a connected USB camera.</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>cd hailo-rpi5-examples
./install.sh
source setup_env.sh
python basic_pipelines/detection_simple.py -i usb</code>
  </div>
</div>

<p><strong>This script will access a connected camera (like a Pi Camera Module or USB webcam) and open a window showing the video feed with bounding boxes and labels drawn around detected objects in real-time!</strong></p>

<h3>✅ Step 6: Verify the Installation</h3>

<p>Verify the installation by checking if the AI HAT is detected:</p>

<div class="code-block">
  <div class="code-header">
    <span class="code-language">bash</span>
    <button class="copy-button" onclick="copyCode(this)">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      Copy
    </button>
  </div>
  <div class="code-content">
<code>hailortcli fw-control identify</code>
  </div>
</div>

<p>If everything is working correctly, you should see the AI HAT information displayed, confirming successful installation.</p>

<h2>🎯 Conclusion & Key Takeaways</h2>

<ul>
  <li>
    <h3>🚀 A Paradigm Shift for Edge AI</h3>
    <p>The Raspberry Pi 5 and Hailo-8L combination brings <strong>data-center class AI performance</strong> to a small, affordable, and power-efficient platform.</p>
  </li>
  <li>
    <h3>👥 Incredibly Accessible</h3>
    <p><strong>Seamless software integration</strong> via the Raspberry Pi OS repository removes the complex setup process, making powerful AI accessible to everyone.</p>
  </li>
  <li>
    <h3>♾️ Limitless Potential</h3>
    <p>This unlocks a vast range of possibilities for <strong>real-time, private, and reliable AI applications</strong> previously out of reach for hobbyists and small businesses.</p>
  </li>
</ul>

<h2>Additional Resources</h2>

<ul>
  <li><strong>Raspberry Pi:</strong> <a href="https://www.raspberrypi.com/" target="_blank" rel="noopener noreferrer">https://www.raspberrypi.com/</a></li>
  <li><strong>Hailo AI:</strong> <a href="https://hailo.ai/" target="_blank" rel="noopener noreferrer">https://hailo.ai/</a></li>
  <li><strong>Hailo RPi Apps Repo:</strong> <a href="https://github.com/hailo-ai/hailo-rpi5-examples" target="_blank" rel="noopener noreferrer">https://github.com/hailo-ai/hailo-rpi5-examples</a></li>
</ul>

<p style="text-align: center; margin-top: 3rem; font-size: 1.2em; color: #666;">💡 <em>The future of AI is at the edge, and Raspberry Pi is taking us there in an accessible and practical way.</em></p>
`;
