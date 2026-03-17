---
title: "Golf Canada Alexa Skill (Unofficial)"
description: Ask Alexa about your Golf Canada handicap, membership status, and favorite courses.
order: 3
github: "https://github.com/kenjdavidson/golf-canada-alexa"
---

An unofficial Amazon Alexa skill that brings Golf Canada membership features to your voice assistant. Built with Kotlin/JVM on AWS Lambda and deployed via AWS SAM, the skill authenticates against Golf Canada through an OAuth proxy layer and then exposes voice commands for checking your current handicap index (as well as a friend's handicap from your Golf Canada friends list), viewing your membership status and expiry date, and listing your favourite courses. Results are cached to keep responses snappy, and no personal data is stored beyond the Alexa Account Linking tokens required to authenticate each request.

The project is not yet publicly released, but the goal is to have it ready for developer installation and localized testing this summer. Core functionality — account linking, handicap lookup, membership status, and favourite courses — is implemented and tested. Score history and score posting are planned for a future iteration. For the full list of available and upcoming voice commands, see the [Available Features](https://github.com/kenjdavidson/golf-canada-alexa/blob/main/docs/AVAILABLE_FEATURES.md) documentation.
