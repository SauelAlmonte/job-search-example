const searchForm = document.querySelector("#search-form");
const jobType = document.querySelector("#job-type");
const resultSection = document.querySelector("#result-section");
// const submitBtn = document.querySelector('#submit')

let sampleData = {
    salary_min: 50000,
    longitude: -0.776902,
    location: {
        __CLASS__: "Adzuna::API::Response::Location",
        area: ["UK", "South East England", "Buckinghamshire", "Marlow"],
        display_name: "Marlow, Buckinghamshire"
    },
    salary_is_predicted: 0,
    description: "JavaScript Developer Corporate ...",
    __CLASS__: "Adzuna::API::Response::Job",
    created: "2013-11-08T18:07:39Z",
    latitude: 51.571999,
    redirect_url: "http://adzuna.co.uk/jobs/land/ad/129698749...",
    title: "Javascript Developer",
    category: {
        __CLASS__: "Adzuna::API::Response::Category",
        label: "IT Jobs",
        tag: "it-jobs"
    },
    id: "129698749",
    salary_max: 55000,
    company: {
        __CLASS__: "Adzuna::API::Response::Company",
        display_name: "Corporate Project Solutions"
    },
    contract_type: "permanent"
};

let jobs = [];

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const jobResults = searchJobs(jobType.value);

    // resultSection.innerHTML = '<div id="result-section"></div>';

    // jobs.forEach(function (job) {
    //   const div = document.createElement("div");
    //   div.innerHTML = ` <h4>${job.title}</h4> <p>${job.description}</p> `;
    //   resultSection.appendChild(div);
    // });

    // job.title
    // job.description
    // job.location.display_name
    // job.contract_time
    // job.salary_max
    //  job.salary_min
    jobResults.forEach(function (job) {
        const div = document.createElement("div");
        div.innerHTML = ` 
    <h4><a href=${job.redirect_url}>${job.title}</a></h4> 
    <h5>${job.salary_min} - ${job.salary_max}</h5>
    <h6>${job.location.display_name} - ${job.contract_time}</h6>
    <p>${job.description}</p> 
    `;

        resultSection.appendChild(div);
    });
});

// or

// searchForm.addEventListener('submit', () => {})

async function searchJobs(jobString, jobsCount = 10, country = "us") {
    const url = `http://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=66a746a9&app_key=68aca40691422c92c975384f483f8bbd&results_per_page${jobsCount}&what=${jobString}&content-type=application/json`;

    const result = await fetch(url);
    const data = await result.json();
    return data;

    // console.log(result);

    //@TODO: query api for jobs
    //returns dummy object

    // jobs.push(sampleData);
    // return sampleData;
}
