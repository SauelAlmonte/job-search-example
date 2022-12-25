const searchForm = document.querySelector("#search-form");
const jobType = document.querySelector("#job-type");
const resultSection = document.querySelector("#result-section");
// const submitBtn = document.querySelector('#submit')

const SEARCH_COUNTRY = 'us'

// Page
searchForm.addEventListener('submit', async function (e){
    e.preventDefault()
    getJob()
})

async function getJob(){
    const jobName = jobType.value
    let jobResults = await searchJobs(jobName)
    let jobs = jobResults.results
    let jobsFound = jobResults.count

    updatePage(jobs, jobsFound, jobName)
}

// Page
function updatePage(jobs, jobsFound, jobName){
// update page with results
    resultSection.innerHTML = 
        `<div id="result-section" class="p-4">
         <h1><strong>${jobsFound}</strong> jobs found for <strong>${jobName.toUpperCase()}</strong> in <strong>${SEARCH_COUNTRY.toUpperCase()}</strong></h1>
         </div>`   
    
    jobs.forEach(function (job){
        const div = document.createElement('div')
        div.innerHTML = 
            `<h4 class="pl-4 pb-2"><a href="${job.redirect_url}"><strong class="text-blue-700">${job.title}</strong></a> | <strong>${job.location.display_name}</strong></h4> <p class="pl-4 pb-4 px-24 ">${job.description}</p>`
        resultSection.appendChild(div)
    })
}

async function searchJobs (jobString, jobsCount = 10, country = SEARCH_COUNTRY){
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=66a746a9&app_key=68aca40691422c92c975384f483f8bbd&results_per_page=${jobsCount}&what=${jobString}&content-type=application/json`

    const result = await fetch(url)
    const data = await result.json()

    return data
}