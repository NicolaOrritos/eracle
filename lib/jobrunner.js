
'use strict'

module.exports =
{
    new: function(job)
    {
        if (job && job.command)
        {
            // TODO
        }
        else
        {
            throw new Error('Nothing to run')
        }
    }
}
