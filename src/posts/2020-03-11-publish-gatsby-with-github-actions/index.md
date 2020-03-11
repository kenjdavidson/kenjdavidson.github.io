---
type: Blog
categories: [Blog]
title: Pusblish Gatsby with Github Actions
summary: Get your Gatsby site published automatically on push or pull, without needing to be home
tags: [Gatsby, Github Pages, Github Workflows]
---

Now that I've got things rolling with my [Gatsby conversion](/writing/2020/03/01/here-comes-gatsby) and everything seems good working with Github Pages, it was time to automate the build/release process.  I'm definitely not perfect, which can easily be seen from my typos (I tend to type faster than I think), and as such, am always noticing small issues that I don't want to let sit.  Github provides inline editing and pull commits that allow quick changes - the trouble is once the changes are made, the publish doesn't automatically happen like it did with Jekyll.

Enter [Github Workflows](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-and-managing-workflow-files-and-runs) and [Gatsby Publish action](https://github.com/marketplace/actions/gatsby-publish).  With this combination, it's straight forward(ish) to setup and ensure that you can edit/build/publish your site from anywhere.

## Github Workflow Config

The first step to setting up workflows is to create a configuration file, from your project page:
- click on `Actions` 
- then `New Workflow`.  

When I started I used the default `Node.js Workflow` but you can copy the following into the basic starter:

```yml
# Publish Gatsby
name: publish-gatsby

# Controls when the action will run. Triggers the workflow on push or pull request 
# events but only for the master branch
on:
  push:
    branches: [ gatsby ]
  pull_request:
    branches: [ gatsby ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner on which this job will run
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    # - Checkout gatsby branch
    # - Update authentication for Github Package Registry @kenjdavidson/base16-scss
    # - Build gh-pages using action
    steps:
      - uses: actions/checkout@v1
      - name: Authenticate with GitHub package registry // highlight-line
        run: echo "//npm.pkg.github.com/:_authToken=${{ secrets.ACCESS_TOKEN }}" > ~/.npmrc // highlight-line
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
```

At a high level this file is:
- Kicking the workflow off on Push and Pull of the `gatsby` branch, which is configured as my main branch
- Checks out the branch
- Applies any custom logic (see below)
- Runs the gh-pages action

> The highlighted lines are used to import the `@kenjdavidson/base16-scss` package which I have posted to Github Package Registry, if you don't have any package registry requirements, these lines can be removed from your configuration file.

### Project Secrets

This workflow requires access to the `Github Package Registry` and `Push` to the repository, this is where the `secrets.ACCESS_TOKEN` comes in.  First you'll need to create a Github [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line), I won't get into those steps here, they are pretty straight forward.

> Note - once you create your access token you can't ever get it back.  So you'll either need to store it somewhere safe, regenterate it (which would require you updating all other places its required), or have one per action/feature so that resetting doesn't affect anything else.  I'm unsure of Github best practices?

In order to configure your [secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets), from you project page:
- Click `Settings`
- Click `Secrets`
- `Add New Secret` 

You'll be asked to enter the name `ACCESS_TOKEN` (required by the action) and the content.

## Running the Workflow

Once saved, you will be able to either push or pull request a file into your repository, which will kick off the job.  You can acces the logs within the `Actions` tab of your repository:

![Publish Gatsby Workflow](./publish-gatsby.png)
