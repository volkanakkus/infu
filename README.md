# infu

`infu` is a little CLI tool designed to let you share personalized messages, links, thoughts from your terminal using your GitHub username. 

This tool is perfect for quickly introducing yourself or sharing information through the terminal in a visually appealing and interactive way.

```bash
# Try it out!
$ npx infu
```

## 🚀 Features

- **GitHub Profile Display**: Show a GitHub profile directly in the terminal by running `npx infu {username}`. It includes the profile image, name, and profile link.
- **Customizable User Messages**: Easily add a custom `infu.json` file to your GitHub main branch to display a personalized message. You can share thoughts, links, or other content through this JSON file.
- **Quick Terminal Links**: Define links in `infu.json`, and the tool will present these as interactive options in the terminal, allowing users to open selected links in their browser.
- **Accessible Help and Documentation**:
  - `--help` or `-h` displays usage instructions.
  - `--docs` or `-d` provides a quick link to documentation.

## 📖 Documentation

Complete documentation on setting up and using `infu` will be available soon on the  [infu docs](https://infu.volkanakkus.com). Stay tuned for updates!

## 📌 Example Usage

Run the following commands to start using `infu`:

```bash
# Display a profile in the terminal
$ npx infu volkanakkus

# Show help information
$ npx infu --help

# Open documentation
$ npx infu --docs
```
## 🔧 Setting Up `infu.json`

We're working on a website to make it easier to set up `infu.json` and customize your messages. For now, you can follow these steps to set up your custom messages:

---

To display custom messages or links, create a file named `infu.json` in GitHub profile's main branch. Here’s an example setup:

```json
{
  "text": "Hello from your terminal! Check out my latest projects.",
  "options": [
    { "text": "View my portfolio", "link": "https://myportfolio.com" },
    { "text": "Connect on LinkedIn", "link": "https://linkedin.com/in/username" }
  ],
  "promptText": "What would you like to explore?",
  "optionLeaveText": "👋 Okay. See you."
}
```

## License

This project is licensed under the MIT License. Inspired by [F](https://github.com/f) <3
