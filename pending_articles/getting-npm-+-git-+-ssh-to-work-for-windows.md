This is a recollection of the steps and debugging I went through to get NPM working with git+ssh package dependencies.

When going through these motions, I was on NPM v1.1.21 and node.js v0.6.19. The package JSON I was using had a private repo and looked akin to this:

```
{
  "dependencies": {
    "eyes": "git+ssh://git@github.com:cloudhead/eyes.js.git"
  }
}
```

Step 1 - Verifying the CLI and Pageant setup
------
Open up a new command shell and try running 'git "clone" <<YOUR_PRIVATE REPO>> testing123'. If all goes well, your private repo should be cloned into a new directory called 'testing123'. If you receive an error about the command 'git' not being found, you need to install Git for Windows. If there is a command about 'public key rejected', this means you either do not have Pageant turned on with the proper key OR properly configured for your setup. In my case, Git for Windows decided to use OpenSSH for the CLI whereas TortoiseGit was using Pageant.

// TODO: Rename Pageant reference to plink

Step 2 - Working with NPM
------
Once you have verified the Git CLI is working on your machine, you are already half-way there. Next, attempt running 'npm install' in the directory containing your package JSON. If all goes well, there will be no hiccups. If you see an error like 'Could not create ProccessW', then this is a problem with your NPM config. Open up a new command shell and run 'npm install which -g' then 'node -e "console.log(require('which').sync.cmd('git'))"'. The second command should output something like "C:\Program Files (x86)\Git\bin\git.CMD", take that string and run 'npm -g config set git "C:\Program Files (x86)\Git\bin\git.CMD"'. Now, you should run 'npm install' and everything will work fine.

// TODO: Verify -g is needed
// TODO: Verify -ProcessW thing is proper
// TODO: Verify node -e code works
// TODO: Verify location of git

Notes
-----
My debug process for learning all of this: - went inside of npm and started doing some console.log's. - did a lot of sniffing to see if there was any off by one errors with paths or directories but nope. - created test script to verify child_process's exec was working. - went back into NPM and replaced exec lines with child_process's exec. - verified things were working. - attempted to find out why cp.exec worked and other exec didn't. - a GitHub issue brought me to find a patch for spawn which used which. - replacing out my previous patch with this patch worked - looking back over the exec code, I saw 'git.config.get("git")' and it clicked. - I removed my prior spawn patch and did the git config. - everything worked.

// TODO: verify git.config.get('git')'