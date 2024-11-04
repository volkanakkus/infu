#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import terminalLink from 'terminal-link';
import terminalImage from 'terminal-image';
import got from 'got';
import wordWrap from 'word-wrap';
import inquirer from 'inquirer';
import open from 'open';

(async () => {
  const args = process.argv.slice(2);

  const firstArg = args[0];
  const isHelp = firstArg === '--help' || firstArg === '-h';

  if (isHelp) {
    console.log(
      wordWrap(
        `‎
    ${chalk.blue.bold('Usage:')}
      $ npx infu {username}

    ${chalk.blue.bold('Instructions:')}
      1. Go to the ${terminalLink(
        chalk.red.bold('infu website.'),
        'https://infu.vercel.app'
      )}
      2. Enter your Github username and fill the form and save the ${chalk.greenBright.bold(
        'infu.json'
      )}.
      3. Add the ${chalk.greenBright.bold(
        'infu.json'
      )} to your GitHub profile's main branch.
      4. That's it! Now you can run '${chalk.greenBright.bold(
        'npx infu {username}'
      )}' in your terminal.
      
    ${chalk.blue.bold('Flags:')}
      --help, -h  Show help

    ${chalk.blue.bold('Examples:')}
      $ npx infu volkanakkus
      $ npx infu --help      
    ‎
`.trim(),
        { width: 200, trim: true }
      )
    );
    return;
  }

  const username = firstArg || 'volkanakkus';

  if (!firstArg) {
    //Here tell I'm volkan, I build this tool, show the code of help and make a divider and show my profile

    console.log(
      wordWrap(
        `
        ‎
        ${chalk.green.bold('Hi, I am Volkan!')}
        With this little tool named ${chalk.red.bold(
          'infu'
        )} you can share what you want from terminal. 
        Write your thoughts, share your links, import your cv or just say hi to the world.

        You can learn more ${terminalLink(
          chalk.blueBright.bold('here.'),
          'https://github.com/volkanakkus/infu'
        )} or you can run ${chalk.greenBright.bold(
          'npx infu --help'
        )} to see the instructions.

        ════════════════════════════════════════════════════════
        👇 Here's an example of how it looks like
        ════════════════════════════════════════════════════════

        $ npx infu volkanakkus 

        `.trim(),
        {
          width: 300,
          trim: true,
        }
      )
    );
  }

  try {
    const userResponse = await got(`https://api.github.com/users/${username}`, {
      responseType: 'json',
    });
    const userData = userResponse.body;

    const avatarUrl = userData.avatar_url;
    const imageResponse = await got(avatarUrl, { responseType: 'buffer' });
    const image = await terminalImage.buffer(imageResponse.body, {
      width: '20%',
    });

    console.log(
      wordWrap(
        `
        ‎
        ${image}
        ‎`.trim(),
        {
          width: 40,
          trim: true,
        }
      )
    );
    console.log(
      wordWrap(
        `
Hey, it's ${chalk.blue.bold(userData.name || userData.login)}!
GitHub profile: ${terminalLink(
          chalk.red.bold(userData.html_url),
          userData.html_url
        )}
        
`.trim(),
        { width: 200, trim: true }
      )
    );

    try {
      const infuResponse = await got(
        `https://raw.githubusercontent.com/${userData.login}/${userData.login}/main/infu.json`,
        { responseType: 'json' }
      );
      const infuData = infuResponse.body;

      if (infuData && infuData.text) {
        console.log(
          wordWrap(
            chalk.green
              .bold(`\n\n${userData.name || userData.login} says:\n`)
              .trim(),
            {
              width: 50,
              trim: true,
            }
          )
        );

        console.log(
          wordWrap(
            `${infuData.text}
            ‎`.trim(),
            {
              width: 50,
              trim: true,
            }
          )
        );
      }

      const choices = infuData.options.map((option) => ({
        name: chalk.cyan(option.text),
        value: option.link,
      }));

      choices.push({
        name: chalk.red(infuData.optionLeaveText || '👋  Nope. Bye.'),
        value: false,
      });

      const answers = await inquirer.prompt([
        {
          type: 'list',
          message: infuData.promptText || 'More from me:',
          name: 'open',
          choices: choices,
        },
      ]);

      if (answers.open) {
        await open(answers.open);
      }
    } catch (infuError) {
      if (infuError.message.includes('0 null')) return;

      if (userData.login) {
        console.log(
          wordWrap(
            chalk.red
              .bold(
                `\n\n${
                  userData.name || userData.login
                } has nothing to say with infu.\n`
              )
              .trim(),
            {
              width: 150,
              trim: true,
            }
          )
        );
      }
    }

    process.exit();
  } catch (error) {
    console.log(
      wordWrap(chalk.red.bold(`User not found`).trim(), {
        width: 50,
        trim: true,
      })
    );
  }
})();
