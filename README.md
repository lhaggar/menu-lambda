# Menu Lambda For Slack

[![CircleCI](https://circleci.com/gh/lhaggar/menu-lambda/tree/master.svg?style=svg)](https://circleci.com/gh/lhaggar/menu-lambda/tree/master)

## What?

The canteen in the News UK building publishes its menu to a [website](http://5438cpa251hgt.co.uk). This lambda, deployed automatically via CircleCI, is trigged every morning to post the menu for the day to Slack via a webhook. (For all the lazy people, myself included, who can't be bothered to open a bookmark.)

## How?

The site itself does not have any form of API, nor does it have a reliable structure to the html; e.g. all lines could be an h2. The only loosely reliable way to parse the page is getting the html snippet from the [Squarespace data](http://5438cpa251hgt.co.uk/?format=json) and getting the text out from the DOM. With that, we look at the pre-configured expected headings and we pull out the text between these headings, while also handling variations in the heading text, excluding certain lines, handling multiple food options under one section heading, and so on.

## Why?

The original lambda was put together by another developer on the team; [markios](https://github.com/markios/menu_lambda). Between a new set of caterers taking on the canteen (and changing the expected section headings) and then Mark leaving, I thought I'd take it on as a "fun" programming challenge. Had a go myself re-writing from scratch, and spending perhaps a bit too much time on it than it deserved!

## Any Suggestions?

If you've come here after seeing a broken Slack post then head to the issues page, or feel free to fork, fix, and open a PR. Keep it to issues regarding the lambda only though, I can't help if the food on offer doesn't entice you I'm afraid.
