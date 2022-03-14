# Fast-Check

<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Al3xDo/Fast-Check/">
    <img src="https://github.com/Al3xDo/Fast-Check/blob/main/client/public/icon.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FAST CHECK WEBSITE</h3>

  <p align="center">
    An awesome Website allow attendance checking for teacher, leader
    <br />
    <a href="https://github.com/Al3xDo/Fast-Check/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/Al3xDo/Fast-Check/issues">Report Bug</a>
    ·
    <a href="https://github.com/Al3xDo/Fast-Check/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/LogIn.png)

[![Product Name Screen Shot][product-screenshot2]](https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/Home.png)

[![Product Name Screen Shot][product-screenshot3]](https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/User.png)

The Fast-Check project will allow the user to

- Create and Manage room
- Create user
- Check members attendance through their webcam

I hope this project will help speeding up the checking attendance process

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

<div align="center">  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="MySQL" height="50" />  
<img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/flask.png" alt="Flask" height="50" />  
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Set up env file for project

1. client env
   Create a .env file in client root folder with content:

```sh
REACT_APP_CLIENT_ID = xxxxx.apps.googleusercontent.com (your client ID for google login feature)
```

Create a .env file in server root folder with content:

```sh
SECRET_KEY='SECRET'
DB_NAME='your name'
DB_PASSWORD='your pass'
DB_HOST='your host'
DB_PROD_HOST='your product db host'
DB_DOCKER_HOST='your docker db host'
RESULT_BACKEND = 'redis://{your_host}:{your_port}'
BROKER_URL = 'redis://{your_host}:{your_port}'
MAIL_SERVER='your mail server'
MAIL_PORT = 'your mailport'
MAIL_USERNAME = 'MAIL USERNAME'
MAIL_PASSWORD = 'your mail password'
MAIL_DEFAULT_SENDER="your mail default sender"
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Al3xDo/Fast-Check.git
   ```
2. Install NPM packages
   ```sh
   cd /client
   npm install
   ```
3. Install python packages
   ```sh
   cd .. # Go to the root of the repo
   cd /server
   pip install -r requirements.txt
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation with Docker

1. Build and run
   ```sh
   docker-compose up
   ```
   <p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

You need to open 2 terminal, one for client and one for server
For running production app, set environment varible **API_ENV=prod**

1. Run the client (first terminal)
   ```sh
   cd client
   npm start
   ```
2. Run server (second terminal)
   ```sh
   cd server
   python manage.py run
   ```
   for the first run, you need to initiliaze the database first
   ```sh
   python manage.py db init
   python manage.py db migrate
   python manage.py db upgrade
   ```
   then you can run server by
   ```sh
   python manage.py run
   ```
   Access http://localhost:3000/ to see the webpage
      <p align="right">(<a href="#top">back to top</a>)</p>
   <!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Allow User to upload their sample image
- [x] Allow User to see their sample image
- [x] Add 'login by google' feature
- [x] Add 'change password' feature (send email verification)
- [ ] Add 'change email' feature (send email verification)
- [ ] Set up nginx
- [ ] Add diagram, database visulization
- [ ] Add 'kick participant' feature
- [ ] Add fake detect or liveliness detection
- [ ] Add 'Admin Dashboard'
- [ ] Speed up performance
- [ ] Multi-language Support
  - [ ] VietNamese
  - [x] English

See the [open issues](https://github.com/Al3xDo/Fast-Check/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/Al3xDo/Fast-Check/](https://github.com/Al3xDo/Fast-Check/)()

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [https://mit-license.org/](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Al3xDo/Fast-Check.svg?style=for-the-badge
[contributors-url]: https://github.com/Al3xDo/Fast-Check/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Al3xDo/Fast-Check.svg?style=for-the-badge
[forks-url]: https://github.com/Al3xDo/Fast-Check/network/members
[stars-shield]: https://img.shields.io/github/stars/Al3xDo/Fast-Check.svg?style=for-the-badge
[stars-url]: https://github.com/Al3xDo/Fast-Check/stargazers
[issues-shield]: https://img.shields.io/github/issues/Al3xDo/Fast-Check.svg?style=for-the-badge
[issues-url]: https://github.com/Al3xDo/Fast-Check/issues
[license-shield]: https://img.shields.io/github/license/Al3xDo/Fast-Check.svg?style=for-the-badge
[license-url]: https://github.com/Al3xDo/Fast-Check/blob/main/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/huy-do-2000/
[product-screenshot]: https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/LogIn.png
[product-screenshot2]: https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/Home.png
[product-screenshot3]: https://github.com/Al3xDo/Fast-Check/blob/develop/ReadMe/User.png
