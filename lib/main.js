#!/usr/bin/env node

'use strict'

const docopt   = require('docopt').docopt


const options = 'Eracle, the uncomplicated job scheduler \n'
              + ' \n'
              + 'Usage: \n'
              + '  eracle add "<JOB_COMMAND>" [-p<PRIORITY>] [-o{-|f|s}] [-w] \n'
              + '  eracle start \n'
              + '  eracle pause \n'
              + '  eracle stop \n'
              + '  eracle status \n'
              + '  eracle -h | --help \n'
              + ' \n'
              + 'Commands: \n'
              + '  start         Start the scheduler if not already started \n'
              + '  pause         Pause the scheduler if not already paused \n'
              + '  stop          Stop the scheduler if not already stopped \n'
              + '  status        Display info summarizing jobs, their status and the state the scheduler is in \n'
              + ' \n'
              + 'Options: \n'
              + '  -p<PRIORITY>  Add the job with priority <PRIORITY> \n'
              + '  -o            How to treat the job\'s output: \n'
              + '                "-" completely suppresses it \n'
              + '                "f" redirects it to a file under /var/log/ \n'
              + '                "s" sends it to stdout/stderr \n'
              + '  -w            Do not start the scheduler immediately \n'
              + '                but wait an explicit "start" command \n'
              + ' \n'
              + '  -h --help     Show this help \n'
              + '  -v --version  Print this server version and then exit \n'
              + ' \n'
              + 'Priorities: \n'
              + '  Jobs can have a specific priority ranging from 0 (lowest) to 9 (highest). \n'
              + '  When not specified a job has a default priority of "4". \n'

const cmd = docopt(options, {version: "0.0.0"})

if (cmd)
{
    if (cmd['add'])
    {
        // TODO
    }
}
