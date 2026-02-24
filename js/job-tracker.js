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


// 4. Toggle Styles 
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

