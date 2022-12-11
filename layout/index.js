const searchForm = document.querySelector("#search-form");
const jobType = document.querySelector("#job-type");
const resultSection = document.querySelector("#result-section");
// const submitBtn = document.querySelector('#submit')

const SEARCH_COUNTRY = 'us'

// Page
searchForm.addEventListener('submit', async function (e){
    e.preventDefault()

    const jobsName = jobType.value
    let jobResults = await searchJobs(jobsName)
    let jobs = jobResults.result
    let jobsFound = jobResults.count

    updatePage(jobs, jobsFound)
})

// Page
function updatePage(jobs, jobsFound, jobsName){
// update page with results
    resultSection.innerHTML = `
        <div id="result-section" class="p-16">
            <h1>${jobsFound} jobs found for <strong>${jobsName}</strong>in ${SEARCH_COUNTRY.toUpperCase()}
            </h1>
        </div> `

    jobs.forEach(function(jobs){
        const div = document.createElement('div')
        div.innerHTML = `<h4><a href="${jobs.redirect_url}">${jobs.title}</a> | ${jobs.location.display_name}</h4> <p>${jobs.description}</p>`

        resultSection.appendChild(div)
    })
}

async function searchJobs (jobString, jobsCount = 10, country = SEARCH_COUNTRY){
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=66a746a9&app_key=68aca40691422c92c975384f483f8bbd&results_per_page=${jobsCount}&what=${jobString}&content-type=application/json`

    const result = await fetch(url)
    const data = await result.json()

    return data
}