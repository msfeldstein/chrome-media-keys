Copyright 2013-2015 Michael Feldstein

The extension can be installed from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/swayfm-unified-music-medi/icckhjgjjompfgoiidainoapgjepncej)

#### Building

Ensure grunt-cli is installed on the system

    npm install -g grunt-cli

Install the npm packages for this project

    npm install # In the project directory

Run grunt

    grunt run

If you see a ENOENT error, make sure imagemagick is installed

    npm install imagemagick

#### Adding a new service

*If you are the owner of a service, you can implement support directly in
your site.  This is far more stable.  See http://sway.fm/api*

1. Create a new controller.  In src/controllers, you can see examples of many
existing controllers.

1. You'll most likely want to copy BasicTemplate.js and fill in the blanks.
You won't need values for everything, some fields are redundant.  For example
you won't need `playPauseSelector` and `playSelector`, just one or the other,    depending on if the play and pause button are separate elements.

1. Add controller to src/background/mappings.coffee.  This will match the domain
of the player to the controller file you just wrote.

That's it.

#### License

The source files for this extension are made available under the AGPLv3 license.
A copy of the text of the license can be found in `LICENSE.txt`
