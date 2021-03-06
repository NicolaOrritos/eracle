
'use strict'

function splitCmdFromArgs(command)
{
    const result = ['', '']

    if (command)
    {
        command = command.trim()

        const firstSpace = command.indexOf(' ')

        if (firstSpace !== -1)
        {
            result[0] = command.slice(0, firstSpace)
            result[1] = command.slice(firstSpace + 1)
        }
        else
        {
            result[0] = command
        }
    }

    return result
}

module.exports =
{
    PRIORITIES:
    {
        LOWEST:        0,
        LOWER:         1,
        LOW:           2,
        NORMAL_LOW:    3,
        NORMAL:        4,
        NORMAL_HIGH:   5,
        NORMAL_HIGHER: 6,
        HIGH:          7,
        HIGHER:        8,
        HIGHEST:       9,

        DEFAULT:       4
    },

    envelope: function(command)
    {
        // Let's check some basic requirements:
        if (command && command.trim)
        {
            command = command.trim();
        }

        if (command)
        {
            let args
            [command, args] = splitCmdFromArgs(command)

            args = args.split(' ')

            let outputDirection

            const result =
            {
                command,
                args,

                priority: module.exports.PRIORITIES.DEFAULT,

                output: () =>
                {
                    outputDirection = 's'

                    const modifier =
                    {
                        to:  direction => outputDirection = direction,

                        direction: () => outputDirection
                    }

                    return modifier
                },

                using: function(options)
                {
                    if (options)
                    {
                        if (!isNaN(options.priority))
                        {
                            const value = Math.floor(options.priority)

                            result.priority = Math.min(module.exports.PRIORITIES.HIGHEST,
                                                       Math.max(module.exports.PRIORITIES.LOWEST, value))
                        }

                        if (options.output)
                        {
                            result.output = options.output
                        }
                    }

                    return this
                },

                dump: () => JSON.stringify(result, null, 4)
            }

            return result
        }
        else
        {
            throw new Error('Nothing to envelope')
        }
    }
}
