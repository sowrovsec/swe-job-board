let allList = [
    { company: "CyberShield Security", position: "Security Analyst", details: "Remote • Full-time • $110,000", desc: "Monitor network traffic for security breaches.", status: "Not Applied" },
    { company: "NextGen Robotics", position: "Embedded Systems", details: "Tokyo, Japan • Full-time • $150,000", desc: "Develop firmware for autonomous robotic systems.", status: "Not Applied" },
    { company: "HealthSync", position: "iOS Developer", details: "London, UK • Contract • $90,000", desc: "Build and maintain healthcare tracking applications.", status: "Not Applied" },
    { company: "FinTech Dynamics", position: "Blockchain Developer", details: "Miami, FL • Full-time • $160,000", desc: "Design smart contracts for financial services.", status: "Not Applied" }
];

let interviewList = [];
let rejectedList = [];

let activeTab = 'All'; 

// get all element from html file
const totalCount = document.getElementById('totalCount');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const availableCount = document.getElementById('availableCount');
const cardsSection = document.getElementById('cardsSection');
const emptyState = document.getElementById('emptyState');
const mainContainer = document.getElementById('mainContainer');

        // counter function 
function calculateCount() {
    totalCount.innerText = allList.length + interviewList.length + rejectedList.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}


// 4. Toggle tab and change style
function toggleStyle(id) {
    
    const allTabs = document.querySelectorAll('.tab-btn');
    for(let tab of allTabs) {
        tab.classList.remove('bg-blue-600', 'text-white');
        tab.classList.add('bg-white', 'text-gray-700');
    }

    
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-700');
    selected.classList.add('bg-blue-600', 'text-white');

    // show  the correct array based on tab click
    if (id === 'all-tab-btn') {
        activeTab = 'All';
        renderCards(allList, 'All');
    } else if (id === 'int-tab-btn') {
        activeTab = 'Interview';
        renderCards(interviewList, 'Interview');
    } else if (id === 'rej-tab-btn') {
        activeTab = 'Rejected';
        renderCards(rejectedList, 'Rejected');
    }
}

//  Render Function 
function renderCards(listToRender, currentStatus) {
    cardsSection.innerHTML = ''; 

    // check emptyjob and show  empty section
    if(listToRender.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Update available job
    availableCount.innerText = listToRender.length + " jobs";

    for (let job of listToRender) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white p-5 rounded-lg shadow-sm border';

      
        let badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Not Applied</span>`;
        let actionButtons = `
            <button class="add-int-btn border border-green-500 text-green-600 text-sm px-3 py-1 rounded cursor-pointer">Interview</button>
            <button class="add-rej-btn border border-red-500 text-red-600 text-sm px-3 py-1 rounded cursor-pointer">Rejected</button>
        `;

        if (currentStatus === 'Interview') {
            badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Interview</span>`;
            actionButtons = `<button class="add-rej-btn border border-red-500 text-red-600 text-sm px-3 py-1 rounded cursor-pointer">Move to Rejected</button>`;
        } else if (currentStatus === 'Rejected') {
            badge = `<span class="inline-block text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">Rejected</span>`;
            actionButtons = `<button class="add-int-btn border border-green-500 text-green-600 text-sm px-3 py-1 rounded cursor-pointer">Move to Interview</button>`;
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
                ${actionButtons}
            </div>
        `;
        cardsSection.appendChild(div);
    }
    calculateCount();



}


// check which button is clicked and perform action base on that
mainContainer.addEventListener('click', function(event) {
    
    // when interview btn click
    if(event.target.classList.contains('add-int-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const companyText = parenNode.querySelector('.companyName').innerText; 

        // Find job 
        let jobObj = allList.find(item => item.company === companyText) || rejectedList.find(item => item.company === companyText);
        
        if(jobObj) interviewList.push(jobObj); 

        // Remove from other arrays
        allList = allList.filter(item => item.company !== companyText);
        rejectedList = rejectedList.filter(item => item.company !== companyText);
    }

    // when reject btn click
    else if(event.target.classList.contains('add-rej-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const companyText = parenNode.querySelector('.companyName').innerText;

        let jobObj = allList.find(item => item.company === companyText) || interviewList.find(item => item.company === companyText);
        
        if(jobObj) rejectedList.push(jobObj);

        allList = allList.filter(item => item.company !== companyText);
        interviewList = interviewList.filter(item => item.company !== companyText);
    }
 // when delete button clicked
    else if(event.target.classList.contains('delete-btn')) {
        const parenNode = event.target.parentNode.parentNode;
        const companyText = parenNode.querySelector('.companyName').innerText;

        // remove all from array
        allList = allList.filter(item => item.company !== companyText);
        interviewList = interviewList.filter(item => item.company !== companyText);
        rejectedList = rejectedList.filter(item => item.company !== companyText);
    }

    
    
});
