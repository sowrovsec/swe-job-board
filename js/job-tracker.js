let allList = [
    {
        company: "RedVault Cyber Defense",
        position: "Penetration Tester",
        details: "Remote • Full-time • $125,000",
        desc: "Conduct advanced penetration tests and simulate real-world cyber attacks to identify system vulnerabilities.",
        status: "Not Applied"
    },
    {
        company: "Orion Autonomous Systems",
        position: "AI Robotics Engineer",
        details: "Tokyo, Japan • Full-time • $170,000",
        desc: "Design and implement intelligent control systems for next-generation autonomous robots.",
        status: "Not Applied"
    },
    {
        company: "MediCore Digital",
        position: "Senior Mobile Engineer",
        details: "London, UK • Contract • $105,000",
        desc: "Lead the development of secure mobile health applications with real-time data synchronization.",
        status: "Not Applied"
    },
    {
        company: "BlockSphere Technologies",
        position: "Web3 Infrastructure Engineer",
        details: "Miami, FL • Full-time • $180,000",
        desc: "Build scalable blockchain infrastructure and optimize distributed ledger performance.",
        status: "Not Applied"
    },
    {
        company: "Nimbus Secure Cloud",
        position: "Cloud Security Architect",
        details: "Toronto, Canada • Full-time • $165,000",
        desc: "Architect secure multi-cloud environments and enforce enterprise-level security standards.",
        status: "Not Applied"
    },
    {
        company: "NeuralStack Analytics",
        position: "Machine Learning Engineer",
        details: "Berlin, Germany • Full-time • $155,000",
        desc: "Develop production-ready ML pipelines and deploy predictive analytics systems.",
        status: "Not Applied"
    },
    {
        company: "CoreKernel Labs",
        position: "Systems Programmer (C/C++)",
        details: "Austin, TX • Full-time • $145,000",
        desc: "Build high-performance system-level software and optimize low-level memory operations.",
        status: "Not Applied"
    },
    {
        company: "VertexScale Innovations",
        position: "Full Stack TypeScript Engineer",
        details: "Remote • Full-time • $140,000",
        desc: "Develop scalable web applications using modern TypeScript frameworks and secure backend APIs.",
        status: "Not Applied"
    }
];



let activeTab = 'All'; 

// get all element from html file
const totalCount = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const availableCount = document.getElementById('availableCount');
const cardsSection = document.getElementById('cardsSection');
const emptyState = document.getElementById('emptyState');
const mainContainer = document.getElementById('mainContainer');


// counter
function calculateCount() {

    let interview = 0;
    let rejected = 0;

    for (let job of allList) {
        if (job.status === "Interview") interview++;
        if (job.status === "Rejected") rejected++;
    }

    totalCount.innerText = allList.length;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;
}


//  Render Function 
function renderCards() {

    cardsSection.innerHTML = '';

    let listToRender = [];

    if (activeTab === 'All') {
        listToRender = allList;
    } else {
        listToRender = allList.filter(job => job.status === activeTab);
    }

    // Empty State
    if (listToRender.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    availableCount.innerText = listToRender.length + " jobs";

    for (let job of listToRender) {

        let div = document.createElement('div');
        div.className = 'job-card bg-white p-5 rounded-lg shadow-sm border';

        // Badge based on status
        let badge = '';

        if (job.status === 'Interview') {
            badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Interview</span>`;
        }
        else if (job.status === 'Rejected') {
            badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>`;
        }
        else {
            badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Not Applied</span>`;
        }

        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="companyName font-semibold text-gray-800">${job.company}</h3>
                    <p class="text-sm text-gray-600">${job.position}</p>
                    <p class="text-xs text-gray-500 mt-1">${job.details}</p>
                </div>
                <button class="delete-btn w-8 h-8 flex items-center justify-center border bg-gray-100 rounded-full text-gray-500 hover:text-red-600 cursor-pointer">
                    <i class="fa-solid fa-trash text-sm pointer-events-none"></i>
                </button>
            </div>
            <div class="mt-2">${badge}</div>
            <p class="text-sm text-gray-600 mt-3">${job.desc}</p>
            <div class="mt-4 flex gap-3">
                <button class="add-int-btn border border-green-500 text-green-600 text-sm px-3 py-1 rounded cursor-pointer">Interview</button>
                <button class="add-rej-btn border border-red-500 text-red-600 text-sm px-3 py-1 rounded cursor-pointer">Rejected</button>
            </div>
        `;

        cardsSection.appendChild(div);
    }

    calculateCount();
}


// Toggle tab and change style
function toggleStyle(id) {

    const allTabs = document.querySelectorAll('.tab-btn');

    for (let tab of allTabs) {
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('bg-white', 'text-gray-700');
    }

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-700');
    selected.classList.add('bg-blue-600', 'text-white');

    if (id === 'all-tab-btn') activeTab = 'All';
    else if (id === 'int-tab-btn') activeTab = 'Interview';
    else if (id === 'rej-tab-btn') activeTab = 'Rejected';

    renderCards();
}


// check which button is clicked and perform action base on that
mainContainer.addEventListener('click', function(event) {

    const card = event.target.closest('.job-card');
    if (!card) return;

    const companyText = card.querySelector('.companyName').innerText;

    let jobObj = allList.find(item => item.company === companyText);
    if (!jobObj) return;

    // Interview clicked
    if (event.target.classList.contains('add-int-btn')) {

        if (jobObj.status === 'Interview') {
            jobObj.status = 'Not Applied';
        } else {
            jobObj.status = 'Interview';
        }
    }

    // Rejected clicked
    else if (event.target.classList.contains('add-rej-btn')) {

        if (jobObj.status === 'Rejected') {
            jobObj.status = 'Not Applied';
        } else {
            jobObj.status = 'Rejected';
        }
    }

    // Delete clicked
    else if (event.target.closest('.delete-btn')) {

        allList = allList.filter(item => item.company !== companyText);
    }

    renderCards();
});


renderCards();
