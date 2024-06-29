# 🌟 AI Researcher Workplace 🌟

![GitHub repo size](https://img.shields.io/github/repo-size/koitran14/AI-researcher-workplace)
![GitHub contributors](https://img.shields.io/github/contributors/koitran14/AI-researcher-workplace)
![GitHub stars](https://img.shields.io/github/stars/koitran14/AI-researcher-workplace?style=social)
![GitHub forks](https://img.shields.io/github/forks/koitran14/AI-researcher-workplace?style=social)
![GitHub issues](https://img.shields.io/github/issues/koitran14/AI-researcher-workplace)

Welcome to the **AI Researcher Workplace** project! This platform is designed to support researchers in the field of artificial intelligence (AI) by providing essential tools, resources, and collaboration features to streamline their research process.

## 📜 Table of Contents
1. [Overview](#-overview-)
2. [Client Side](#-client-side-)
   - [Technologies](#technologies)
   - [Getting Started](#getting-started)
3. [Server Side](#-server-side-)
   - [Technologies](#technologies-1)
   - [Advanced AI Capabilities](#advanced-ai-capabilities)
   - [Getting Started](#getting-started-1)
4. [License](#-license-)
5. [Acknowledgements](#-acknowledgements-)

## 🌐✨ Overview ✨🌐

The AI Researcher Workplace consists of two main components:

- **Client-side Application**: A user-friendly interface for researchers to access tools, collaborate on projects, and explore resources.
- **Server-side API**: Handles authentication, data storage, business logic, and advanced AI capabilities, including Zero-shot Classification for expert suggestions based on users' current projects.

## 🎨✨ Client Side ✨🎨

### Technologies
The client-side application is built using modern web technologies and frameworks:

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and customizable user interfaces.

### 🚀✨ Getting Started ✨🚀

To run the client-side application locally:

1. 🌀 **Clone the repository:**

   ```bash
   git clone https://github.com/koitran14/AI-researcher-workplace.git
   ```

2. 📂 **Navigate to the client directory:**

   ```bash
   cd AI-researcher-workplace/client
   ```

3. ⚙️ **Install dependencies:**

   ```bash
   npm install
   ```

4. 🔑 **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables.
   
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
    
5. ▶️ **Start the development server:**

   ```bash
   npm run dev
   ```

6. 🌐 **Access the application:**

   Open your web browser and navigate to `http://localhost:3000` to access the AI Researcher Workplace client-side application.

For more detailed instructions and documentation, refer to the [client-side repository](https://github.com/koitran14/AI-researcher-workplace/tree/main/client).

## 🔧✨ Server Side ✨🔧

### Technologies
The server-side API manages user authentication, data storage, business logic, and advanced AI capabilities. It is built using:

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **CORS**: Cross-Origin Resource Sharing middleware for FastAPI to handle requests from the client-side application.
- **SQLAlchemy**: A SQL toolkit and Object-Relational Mapping (ORM) library for Python, used for interacting with MySQL database.

### 🤖✨ Advanced AI Capabilities ✨🤖

In addition to standard API functionalities, the server-side implements advanced natural language processing (NLP) capabilities using the BART-Large-MNLI model from Hugging Face. This model is part of the BART (Bidirectional and Auto-Regressive Transformers) family and is fine-tuned on the MultiNLI (Multi-Genre Natural Language Inference) dataset.

#### **Model Used: Facebook/BART-Large-MNLI by Hugging Face**

- **Model Description**: BART-Large-MNLI is a variant of the BART model, pre-trained on large-scale text data using a denoising autoencoder objective. It is fine-tuned on the MNLI dataset, which includes tasks like textual entailment and contradiction recognition.

- **Purpose**: The BART-Large-MNLI model performs Zero-shot Classification, predicting relationships between experts and users' projects without explicit training data. It leverages the semantic understanding encoded in the BART model to suggest relevant experts based on project topics, expertise, and user preferences.

- **Implementation**: Integrated into the server-side API using the Hugging Face Transformers library. The model takes project descriptions, user profiles, and other text inputs as input, producing inferred relationships between users and projects as output.

- **Benefits**: By utilizing the BART-Large-MNLI model, the platform provides more accurate and personalized project recommendations, expert suggestions, and collaboration opportunities, enhancing user experience and fostering productive research collaborations.

#### **Example Use Cases**

- **Project Recommendations**: The API analyzes a user's project description, leveraging the BART-Large-MNLI model to identify similar projects or related topics and suggest relevant projects for collaboration or reference.
- **Expert Suggestions**: Based on the expertise encoded in the model, the API identifies and recommends experts whose skills align with a user's project topics.
- **Collaboration Opportunities**: Facilitates connections between users and projects through advanced AI capabilities, enhancing collaboration opportunities within the research community.

### 🚀✨ Getting Started ✨🚀

To run the server-side API locally:

1. 🌀 **Clone the repository:**

   ```bash
   git clone https://github.com/koitran14/AI-researcher-workplace.git
   ```

2. 📂 **Navigate to the server directory:**

   ```bash
   cd AI-researcher-workplace/server
   ```

3. ⚙️ **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. 🔑 **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables.
   
   ```bash
   SECRET_KEY= 'YOUR_SECRET_KEY_FOR_TOKEN'
   ALGORITHM= 'HS256'
   HUGGINGFACEHUB_API_TOKEN='YOUR_HUGGINGFACE_SECRET_KEY'
   UPLOAD_DIRECTORY= "/uploads"
   ```

5. ▶️ **Start the server:**

   ```bash
   uvicorn main:app --reload
   ```

For more detailed instructions and documentation, refer to the [server-side repository](https://github.com/koitran14/AI-researcher-workplace/tree/main/server).

## 📜✨ License ✨📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏✨ Acknowledgements ✨🙏

Special thanks to all contributors and open-source projects that made this project possible.
