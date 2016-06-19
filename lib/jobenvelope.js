
'use strict'

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
            const result =
            {
                command:  command,

                priority: module.exports.PRIORITIES.DEFAULT,

                output:   's',

                using: function(options)
                {
                    if (options)
                    {
                        if (!isNaN(options.priority))
                        {
                            const value = Math.floor(options.priority)

                            result.priority = Math.Min(module.exports.PRIORITIES.HIGHEST,
                                                       Math.Max(module.exports.PRIORITIES.LOWEST, value))
                        }

                        if (options.output)
                        {
                            result.output = options.output
                        }
                    }
                }
            }

            return result
        }
        else
        {
            throw new Error('Nothing to envelope')
        }
    }
}
