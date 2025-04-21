document.addEventListener('DOMContentLoaded', function() {
    // Define the KMS activation keys data based on the markdown
    const activationKeys = {
        // Windows 11 and Windows 10
        'windows-11-10-pro': 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
        'windows-11-10-pro-n': 'MH37W-N47XK-V7XM9-C7227-GCQG9',
        'windows-11-10-pro-workstation': 'NRG8B-VKK3Q-CXVCJ-9G2XF-6Q84J',
        'windows-11-10-pro-workstation-n': '9FNHH-K3HBT-3W4TD-6383H-6XYWF',
        'windows-11-10-pro-education': '6TP4R-GNPTD-KYYHQ-7B7DP-J447Y',
        'windows-11-10-pro-education-n': 'YVWGF-BXNMC-HTQYQ-CPQ99-66QFC',
        'windows-11-10-education': 'NW6C2-QMPVW-D7KKK-3GKT6-VCFB2',
        'windows-11-10-education-n': '2WH4N-8QGBV-H22JP-CT43Q-MDWWJ',
        'windows-11-10-enterprise': 'NPPR9-FWDCX-D2C8J-H872K-2YT43',
        'windows-11-10-enterprise-n': 'DPH2V-TTNVB-4X9Q3-TJR4H-KHJW4',
        'windows-11-10-enterprise-g': 'YYVX9-NTFWV-6MDM3-9PT4T-4M68B',
        'windows-11-10-enterprise-g-n': '44RPN-FTY23-9VTTB-MP9BX-T84FV',
        
        // Windows 10 LTSC/LTSB
        'windows-10-ltsc-2019': 'M7XTQ-FN8P6-TTKYV-9D4CC-J462D',
        'windows-10-ltsc-2019-n': '92NFX-8DJQP-P6BBQ-THF9C-7CG2H',
        'windows-10-ltsb-2016': 'DCPHK-NFMTC-H88MJ-PFHPY-QJ4BJ',
        'windows-10-ltsb-2016-n': 'QFFDN-GRT3P-VKWWX-X7T3R-8B639',
        'windows-10-ltsb-2015': 'WNMTR-4C88C-JK8YV-HQ7T2-76DF9',
        'windows-10-ltsb-2015-n': '2F77B-TNFGY-69QQF-B8YKP-D69TJ',
        
        // Windows Server 2025
        'windows-server-2025-standard': 'TVRH6-WHNXV-R9WG3-9XRFY-MY832',
        'windows-server-2025-datacenter': 'D764K-2NDRG-47T6Q-P8T8W-YP6DF',
        'windows-server-2025-datacenter-azure': 'XGN3F-F394H-FD2MY-PP6FD-8MCRC',
        
        // Windows Server 2022
        'windows-server-2022-standard': 'VDYBN-27WPP-V4HQT-9VMD4-VMK7H',
        'windows-server-2022-datacenter': 'WX4NM-KYWYW-QJJR4-XV3QB-6VM33',
        'windows-server-2022-datacenter-azure': 'NTBV8-9K7Q8-V27C6-M2BTV-KHMXV',
        
        // Windows Server 2019
        'windows-server-2019-standard': 'N69G4-B89J2-4G8F4-WWYCC-J464C',
        'windows-server-2019-datacenter': 'WMDGN-G9PQG-XVVXX-R3X43-63DFG',
        'windows-server-2019-essentials': 'WVDHN-86M7X-466P6-VHXV7-YY726',
        
        // Windows Server 2016
        'windows-server-2016-standard': 'WC2BQ-8NRM3-FDDYY-2BFGV-KHKQY',
        'windows-server-2016-datacenter': 'CB7KF-BWN84-R7R2Y-793K2-8XDDG',
        'windows-server-2016-essentials': 'JCKRF-N37P4-C2D82-9YXRT-4M63B',
        
        // Windows 8.1
        'windows-8.1-pro': 'GCRJD-8NW9H-F2CDX-CCM8D-9D6T9',
        'windows-8.1-enterprise': 'MHF9N-XY6XB-WVXMC-BTDCT-MKKG7',
        
        // Windows 8
        'windows-8-pro': 'NG4HW-VH26C-733KW-K6F98-J8CK4',
        'windows-8-enterprise': '32JNW-9KQ84-P47T8-D8GGY-CWCK7',
        
        // Windows 7
        'windows-7-pro': 'FJ82H-XT6CR-J8D7P-XQJJ2-GPDD4',
        'windows-7-enterprise': '33PXH-7Y6KF-2VJC9-XBBR8-HVTHH'
    };

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            btn.classList.add('active');
            const tabId = `${btn.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
            
            // Reset commands when switching tabs
            updateCommands();
        });
    });

    // Custom KMS server for Windows
    const kmsServerSelect = document.getElementById('kms-server');
    const customKmsServerInput = document.getElementById('custom-kms-server');
    
    kmsServerSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customKmsServerInput.style.display = 'block';
        } else {
            customKmsServerInput.style.display = 'none';
        }
        updateCommands();
    });
    
    customKmsServerInput.addEventListener('input', updateCommands);

    // Custom KMS server for Office
    const kmsServerOfficeSelect = document.getElementById('kms-server-office');
    const customKmsServerOfficeInput = document.getElementById('custom-kms-server-office');
    
    kmsServerOfficeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customKmsServerOfficeInput.style.display = 'block';
        } else {
            customKmsServerOfficeInput.style.display = 'none';
        }
        updateCommands();
    });
    
    customKmsServerOfficeInput.addEventListener('input', updateCommands);

    // Custom Office path
    const officePathSelect = document.getElementById('office-path');
    const customOfficePathInput = document.getElementById('custom-office-path');
    
    officePathSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customOfficePathInput.style.display = 'block';
        } else {
            customOfficePathInput.style.display = 'none';
        }
        updateCommands();
    });
    
    customOfficePathInput.addEventListener('input', updateCommands);

    // Windows version selection
    const windowsVersionSelect = document.getElementById('windows-version');
    windowsVersionSelect.addEventListener('change', updateCommands);

    // Generate commands based on selections
    function updateCommands() {
        const commandsContainer = document.getElementById('commands-container');
        const copyAllBtn = document.getElementById('copy-all-btn');
        
        // Get the active tab
        const activeTab = document.querySelector('.tab-content.active');
        const tabId = activeTab.id;
        
        // Clear previous commands
        commandsContainer.innerHTML = '';
        
        // Windows activation commands
        if (tabId === 'windows-tab') {
            const windowsVersion = windowsVersionSelect.value;
            
            if (!windowsVersion) {
                commandsContainer.innerHTML = `
                    <div class="command-section">
                        <div class="command-info">
                            <span>请选择 Windows 版本以生成激活命令</span>
                        </div>
                    </div>
                `;
                copyAllBtn.disabled = true;
                return;
            }
            
            const activationKey = activationKeys[windowsVersion];
            let kmsServer = kmsServerSelect.value;
            
            if (kmsServer === 'custom') {
                kmsServer = customKmsServerInput.value.trim();
                if (!kmsServer) {
                    commandsContainer.innerHTML = `
                        <div class="command-section">
                            <div class="command-info">
                                <span>请输入自定义 KMS 服务器地址</span>
                            </div>
                        </div>
                    `;
                    copyAllBtn.disabled = true;
                    return;
                }
            }
            
            // Create command elements
            const commands = [
                { desc: '1. 安装密钥', cmd: `slmgr -ipk ${activationKey}` },
                { desc: '2. 设置 KMS 服务器', cmd: `slmgr -skms ${kmsServer}` },
                { desc: '3. 激活 Windows', cmd: 'slmgr -ato' }
            ];
            
            createCommandElements(commands);
            copyAllBtn.disabled = false;
        }
        // Office activation commands
        else if (tabId === 'office-tab') {
            let officePath = officePathSelect.value;
            
            if (officePath === 'custom') {
                officePath = customOfficePathInput.value.trim();
                if (!officePath) {
                    commandsContainer.innerHTML = `
                        <div class="command-section">
                            <div class="command-info">
                                <span>请输入自定义 Office 安装路径</span>
                            </div>
                        </div>
                    `;
                    copyAllBtn.disabled = true;
                    return;
                }
            }
            
            let kmsServer = kmsServerOfficeSelect.value;
            
            if (kmsServer === 'custom') {
                kmsServer = customKmsServerOfficeInput.value.trim();
                if (!kmsServer) {
                    commandsContainer.innerHTML = `
                        <div class="command-section">
                            <div class="command-info">
                                <span>请输入自定义 KMS 服务器地址</span>
                            </div>
                        </div>
                    `;
                    copyAllBtn.disabled = true;
                    return;
                }
            }
            
            // Create command elements
            const commands = [
                { desc: '1. 进入 Office 安装目录', cmd: `cd "${officePath}"` },
                { desc: '2. 注册 KMS 服务', cmd: `cscript ospp.vbs /sethst:${kmsServer}` },
                { desc: '3. 激活 Office', cmd: 'cscript ospp.vbs /act' }
            ];
            
            createCommandElements(commands);
            copyAllBtn.disabled = false;
        }
    }

    // Create command elements
    function createCommandElements(commands) {
        const commandsContainer = document.getElementById('commands-container');
        
        commands.forEach(command => {
            const commandSection = document.createElement('div');
            commandSection.className = 'command-section';
            
            const commandHeader = document.createElement('div');
            commandHeader.className = 'command-header';
            commandHeader.textContent = command.desc;
            
            const commandBox = document.createElement('div');
            commandBox.className = 'command-box';
            commandBox.textContent = command.cmd;
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'command-copy';
            copyBtn.textContent = '复制';
            copyBtn.dataset.command = command.cmd;
            copyBtn.addEventListener('click', function() {
                copyToClipboard(this.dataset.command, this);
            });
            
            commandBox.appendChild(copyBtn);
            commandSection.appendChild(commandHeader);
            commandSection.appendChild(commandBox);
            
            commandsContainer.appendChild(commandSection);
        });
    }

    // Copy all commands button
    const copyAllBtn = document.getElementById('copy-all-btn');
    copyAllBtn.addEventListener('click', function() {
        const commandBoxes = document.querySelectorAll('.command-box');
        let allCommands = '';
        
        commandBoxes.forEach(box => {
            allCommands += box.textContent.replace('复制', '').trim() + '\n';
        });
        
        copyToClipboard(allCommands.trim(), this);
    });

    // Copy to clipboard function
    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '已复制!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('复制失败: ', err);
            alert('复制失败，请手动复制命令');
        });
    }

    // Initialize
    updateCommands();
}); 