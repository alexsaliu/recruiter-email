import { useState, useEffect } from 'react'

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [jobTags, setJobTags] = useState([])

    const [tags, setTags] = useState(['Frontend', 'Backend', 'Fullstack', 'Javascript', 'Python', 'PHP', 'all'])

    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [link, setLink] = useState('')

    const addJob = () => {
        if (!title || !company || !description || !date || !link || !jobTags.length) return
        let newJobs = [...jobs]
        newJobs.push({
            title,
            company,
            description,
            date,
            jobTags,
            link
        })
        setJobs(newJobs)
        setTitle('')
        setCompany('')
        setDescription('')
        setDate('')
        setLink('')
        setJobTags([])
    }

    const deleteJob = (id) => {
        let newJobs = [...jobs]
        newJobs.splice(id, 1)
        setJobs(newJobs)
    }

    const handelJobTag = (tag) => {
        let newTags = [...jobTags]
        if (newTags.includes(tag)) {
            newTags = newTags.filter((x) => x !== tag)
        }
        else {
            newTags.push(tag)
        }
        setJobTags(newTags)
    }

    return (
        <div className="jobs-container">
            <h2>Jobs</h2>
            <div className="create-job">
                Title <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
                Company <input onChange={(e) => setCompany(e.target.value)} type="text" value={company} />
                Description <input onChange={(e) => setDescription(e.target.value)} type="text" value={description} />
                Date <input onChange={(e) => setDate(e.target.value)} type="date" value={date} />
                Link <input onChange={(e) => setLink(e.target.value)} type="text" value={link} />

                {jobTags.map((tag, i) =>
                    <div key={i}>{tag}</div>
                )}

                {tags.map((tag, i) =>
                    <button onClick={() => handelJobTag(tag)} style={jobTags.includes(tag) ? {border: '2px solid lightgreen'} : {}} key={i}>{tag}</button>
                )}
            </div>

            <button onClick={() => addJob()}>Add</button>

            <div className="jobs">
                {jobs.map((job, i) =>
                    <div key={i} className="job">
                        <div>Job: {i}</div>
                        <div>Title: {job.title}</div>
                        <div>Company: {job.company}</div>
                        <div>Description: {job.description}</div>
                        <div>Date: {job.date}</div>
                        <div>
                            {job.jobTags.map((tag, i) =>
                                <div key={i}>{tag}</div>
                            )}
                        </div>
                        <a href={job.link} target="_blank">{job.link}</a>
                        <button onClick={() => deleteJob(i)}>Delete</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Jobs;
