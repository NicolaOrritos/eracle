
'use strict'

const job    = require('./jobenvelope')
const runner = require('./jobrunner')


let jobs = []
let finished = []
const ordered = {}
let current_job
let current_status
let callbackWhenFinished

for (let priority=job.PRIORITIES.LOWEST; priority<job.PRIORITIES.HIGHEST; priority++)
{
    ordered[priority] = []
}


function inner_runner()
{
    if (current_status === module.exports.STATUS.RUNNING)
    {
        current_job = module.exports.first()

        if (current_job)
        {
            runner.new( current_job )
            .catch( module.exports.exit )
            .then( status =>
            {
                if (status === 0)
                {
                    finished.push(current_job)
                    jobs.splice(0, 1)
                    inner_runner()
                }
                else
                {
                    module.exports.exit(new Error('Process exited with status "%s"', status))
                }
            })
        }
        else
        {
            if (callbackWhenFinished)
            {
                callbackWhenFinished()
            }
        }
    }
    else if (current_status === module.exports.STATUS.STOPPED)
    {
        // Recreate original lists:
        jobs = finished.concat(jobs)
        finished = []
    }
}

module.exports =
{
    STATUS:
    {
        RUNNING: "RUNNING",
        STOPPED: "STOPPED",
        PAUSED:  "PAUSED"
    },

    add: function(envelope)
    {
        if (envelope)
        {
            jobs.push(envelope)
            ordered[envelope.priority].push(envelope)
        }
    },

    first: () => jobs.length ? jobs[0] : null,

    status: () => current_status,

    start: function()
    {
        if (current_status !== module.exports.STATUS.RUNNING)
        {
            current_status = module.exports.STATUS.RUNNING

            inner_runner()
        }
        else
        {
            console.log('Already running...')
        }

        return Promise.resolve()
    },

    pause: function()
    {
        if (current_status === module.exports.STATUS.RUNNING)
        {
            current_status = module.exports.STATUS.PAUSED
        }
        else
        {
            console.log('Already paused or stopped...')
        }

        return Promise.resolve()
    },

    stop: function()
    {
        if (   current_status === module.exports.STATUS.RUNNING
            || current_status === module.exports.STATUS.PAUSED)
        {
            current_status = module.exports.STATUS.STOPPED
        }
        else
        {
            console.log('Already stopped...')
        }

        return Promise.resolve()
    },

    finished: () => current_status === module.exports.STATUS.STOPPED && jobs.length() === 0,

    exit: function(err)
    {
        if (err)
        {
            console.err('Could not complete jobs list. %s', err)
        }
        else
        {
            console.log('Jobs list finished')
        }

        process.exit(err ? 1 : 0)
    },

    waiting: () => jobs.length,

    completed: () => finished.length,

    end: function(fn)
    {
        callbackWhenFinished = fn
    }
}


current_status = module.exports.STATUS.STOPPED
