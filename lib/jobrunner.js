
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
                let options

                if (job.output().direction() === 's')
                {
                    options =
                    {
                        stdio: 'inherit'
                    }
                }
                else if (job.output().direction() === '-')
                {
                    options =
                    {
                        stdio: 'ignore'
                    }
                }

                child.spawn(job.command, options)
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
