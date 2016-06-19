
'use strict'

const child = require('child_process')


module.exports =
{
    new: function(job)
    {
        return new Promise( (resolve, reject) =>
        {
            if (job && job.command)
            {
                child.spawn(job.command)
                .on('close', resolve)
                .on('error', reject)
            }
            else
            {
                reject(new Error('Nothing to run'))
            }
        })
    }
}
