<p align="center">
  <img src="/docs/intro.jpg" alt="Azure CI/CD Workshop Banner" width="80%">
</p>

### Mission Prerequisites

Make sure you're geared up with:

- A **GitHub Account**
- An **Azure for Students Account** -> **Portal Link**: [https://portal.azure.com](https://portal.azure.com)
- **Git** installed on your machine

---

## 🎯 Mission: Deploy "Hello, World!"

We'll be deploying the app from the `examples/hello-world` directory. Follow along!

### 1. Create the Web App in Azure

First, we need a place in the cloud for our code to live.

- In the Azure Portal, create a new **"Web App"** resource.
- On the **"Basics"** tab, fill in the details:
  - **Name**: Make it globally unique (e.g., `yourname-hello-world-app`).
  - **Publish**: Code
  - **Runtime stack**: Python 3.14 (or newer)
  - **Operating System**: Linux
  - **App Service Plan**: The Free (F1) tier is your friend!
- **Skip the other tabs for now!** Just click **"Review + create"** and then **"Create"**.

### 2. Set up CI/CD from the Deployment Center

Now that our app exists, let's wire it up to GitHub for that sweet, sweet automation.

- Go to your newly created Web App resource in the Azure portal.
- In the left-hand menu, under "Deployment," click on **"Deployment Center"**.
- **Source**: Choose **"GitHub"**.
- **Authorize** Azure to connect to your GitHub account.
- Select your **Repository** and the `main` **Branch**.
- Azure will detect your Python code and suggest a workflow. Click **"Save"** to approve it.
- This will commit the GitHub Actions workflow file directly to your repository.

### 3. Configure the Startup Command

We need to tell Azure how to start our specific Flask app.

- In the left menu, under "Settings," go to the **"Configuration"** page.
- Under **General settings**, add the following **Startup Command**:
  ```bash
  gunicorn -w 4 app:app
  ```
- **Don't forget to hit Save!**

### 4. Push a Change to Deploy!

Your first deployment was triggered when you set up the Deployment Center. To see the CI/CD in action, make a change to your code, **PULL ONCE**, then commit and push it.

```bash
git push
```

> **🤔 `git push` rejected?** This is expected! Azure just added a file to your repo. Pull the changes first, then push again:
>
> ```bash
> git pull
> git push
> ```

Check the **"Actions"** tab on GitHub to watch your deployment pipeline run. Once it's done, visit your app's URL to see your changes live!

<p align="center">
  <img src="/docs/deploy_ho_gaya.gif" alt="Azure CI/CD Workshop Banner" width="80%">
</p>

---

## 🏆 Level Up: Try the Other Examples!

You've mastered the basics! Now, try deploying the [gtu-grade-predictor](https://gtu-grade-predictor-ekfxfndwc7ghgkhp.centralindia-01.azurewebsites.net/) app from the `examples` folder. The process is the same.

### Example 1: GTU Grade Predictor (Node.js)

This is a simple server-side rendered application using Node.js and Express.

- **Create a new Web App** in Azure.
- **Runtime Stack**: **Node 20 LTS**
- **Startup Command**: In the Configuration page, set the command to `npm start`. This tells Azure to use the `start` script from the `package.json` file.
- **Set up the Deployment Center** just like you did for the Python app. Azure will correctly detect the Node.js project.
- **Remember to `npm install`** locally before you start making any changes.

### Example 2: The Shady URL Shortener (Node.js with a Database!) (Also live [here](https://shady-url-shortener-bmcceaa8aaf5gyg3.centralindia-01.azurewebsites.net/))

This is a full backend application that uses a file-based SQLite database to store data. It demonstrates how Azure's persistent file storage works.

- **Create a new Web App** in Azure.
- **Runtime Stack**: **Node 24 LTS** (or the latest version available).
- **Startup Command**: `npm start`
- **Important `gitignore` step**: Before you deploy, make sure you have a `.gitignore` file inside the `shady-url-shortener` directory that contains:
  ```
  node_modules
  urls.db
  ```
  This is crucial! We want the server to build the `node_modules` folder and create a fresh database file in the cloud. We do not want to commit our local ones.
- **Deploy via the Deployment Center**. When the app runs, the `urls.db` file will be created on Azure's persistent storage, meaning your shortened links won't disappear when the app restarts!

Experimenting (and even breaking things) is the best way to learn.
Good luck, have fun, and welcome to the cloud! ☁️
