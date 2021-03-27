import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    updateJobs
} from '../store/actions.js'


const Jobs = () => {
    const [addNewJob, setAddNewJob] = useState(false)
    const [jobTags, setJobTags] = useState([])
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [link, setLink] = useState('')
    const [noOfTags, setNoOfTags] = useState(0)

    const jobs = useSelector(state => state.app.jobs)
    const tags = useSelector(state => state.app.tags)
    const dispatch = useDispatch()

    useEffect(() => {
        if (tags.length < noOfTags) maintainTags()
        setNoOfTags(tags.length)
    }, [tags])

    const maintainTags = () => {
        const jobsCopy = [...jobs]
        for (const job of jobs) {
            const removedTag = job.jobTags.filter((tag, i) => !tags.includes(tag))
            if (removedTag.length) job.jobTags.splice(job.jobTags.indexOf(removedTag), 1)
        }
        dispatch(updateJobs(jobsCopy))
    }

    const addJob = () => {
        if (!title || !company || !jobTags.length) return
        let newJobs = [...jobs]
        newJobs.push({
            title,
            company,
            description,
            date,
            jobTags,
            link
        })
        dispatch(updateJobs(newJobs))

        setTitle('')
        setCompany('')
        setDescription('')
        setDate('')
        setLink('')
        setJobTags([])
        setAddNewJob(false)
    }

    const deleteJob = (id) => {
        let newJobs = [...jobs]
        newJobs.splice(id, 1)
        dispatch(updateJobs(newJobs))
    }

    const handelTag = (tag) => {
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
        <div className="container jobs-container">
            <h2>Jobs</h2>
            {addNewJob ?
                <div className="create-job">
                    <div>New Job</div>
                    Title <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
                    Company <input onChange={(e) => setCompany(e.target.value)} type="text" value={company} />
                    Description <input onChange={(e) => setDescription(e.target.value)} type="text" value={description} />
                    Date <input onChange={(e) => setDate(e.target.value)} type="date" value={date} />
                    Link <input onChange={(e) => setLink(e.target.value)} type="text" value={link} />

                    <div>Tags
                        {tags.map((tag, i) =>
                            <button onClick={() => handelTag(tag)} className={jobTags.includes(tag) ? 'yellow' : 'hollow'} key={i}>{tag}</button>
                        )}
                    </div>
                    <button className="blue add" onClick={() => addJob()}>Add +</button>
                </div>
            :
                <div onClick={() => setAddNewJob(true)} className="add-job">Add New Job +</div>
            }

            <div className="jobs">
                {jobs.map((job, i) =>
                    <div key={i} className="job">
                        <div><b>Company:</b> {job.company}</div>
                        <div>Id: {i}</div>
                        <div>Title: {job.title}</div>
                        <div>Date: {job.date}</div>
                        <div>Description: {job.description}</div>
                        <div>Tags:
                            {job.jobTags.map((tag, i) =>
                                <span key={i}>{tag}</span>
                            )}
                        </div>
                        <a href={job.link} target="_blank">{job.link}</a>
                        <button className="delete" onClick={() => deleteJob(i)}>X</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Jobs;
