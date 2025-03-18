# Bakery Website

This is my first web project showcasing my capability to build and deploy a website using **Angular 9**. It is a fully functional bakery website, but there are several areas for improvement, which I plan to address in future updates.

## 🚀 Live Demo
The website is now **hosted and deployed**. You can check it out here:

🔗 **[Live Website](#)** *https://bakersworld.netlify.app*

---
## 🛠 Setup & Installation
### Prerequisites
- **Node.js** (Recommended: **v16** for compatibility)
- **Angular CLI** (`npm install -g @angular/cli`)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/bakery-website.git
   cd bakery-website
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open the browser and navigate to:
   ```sh
   http://localhost:4200/
   ```

---
## ⚠️ Potential Issues & Fixes
Since this project was built using **Angular 9**, users may encounter issues when running it on newer Node.js versions.

### **Error:** `ERR_OSSL_EVP_UNSUPPORTED`
#### **Solution 1: Set OpenSSL Legacy Mode** *(Recommended)*
```sh
set NODE_OPTIONS=--openssl-legacy-provider
```

#### **Solution 2: Downgrade to Node.js 16**
1. **Check your Node.js version:**
   ```sh
   node -v
   ```
2. **Install Node.js 16:**
   ```sh
   nvm install 16
   nvm use 16
   ```
3. **Reinstall dependencies:**
   ```sh
   npm ci
   ```
4. **Run the project:**
   ```sh
   ng serve
   ```

---
## 🔧 Future Updates & Improvements
This project is just the beginning! There are several planned improvements:
- ✅ **Upgrade Angular version** (from **v9** to **latest**)
- 🔒 **Implement password hashing** & authentication
- 🔄 **Improve backend security** & optimize API handling
- 🎨 **Enhance UI/UX** with better design principles
- 📱 **Make it fully responsive** for mobile devices
- 📦 **Optimize performance** (lazy loading, better asset management)
- 🛍️ **Implement cart & payment gateway**

I look forward to learning and refining my skills as I improve this project. Stay tuned! 🚀

---
## 🤝 Contributing
If you'd like to contribute or suggest improvements, feel free to fork the repo and create a pull request.

---
## 📜 License
This project is **open-source** and free to use. If you find it useful, consider giving it a ⭐ on GitHub!

---
## 📞 Contact
For any questions or feedback, reach out to me at:
📧 **chinum.upadhyaya@gmail.com**
