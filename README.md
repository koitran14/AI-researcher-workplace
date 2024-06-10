# AI Researcher Workplace

Welcome to the AI Researcher Workplace project! This platform is designed to support researchers in the field of artificial intelligence (AI) by providing essential tools, resources, and collaboration features to streamline their research process.

## Overview

The AI Researcher Workplace consists of two main components:

- **Client-side Application**: The client-side application provides a user-friendly interface for researchers to access tools, collaborate on projects, and explore resources.

- **Server-side API**: The server-side API handles authentication, data storage, business logic, and advanced AI capabilities to support the functionality of the client-side application. This includes implementing Zero-shot Classification to detect correlations between experts and users' current projects for the best suggestions.

## Client Side

The client-side application is built using modern web technologies and frameworks, including:

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and customizable user interfaces.

### Getting Started

To run the client-side application locally:

1. 🌀 Clone the repository:

   ```bash
   git clone https://github.com/koitran14/AI-researcher-workplace.git
   ```

2. 📂 Navigate to the client directory:

   ```bash
   cd AI-researcher-workplace/client
   ```

3. ⚙️ Install dependencies:

   ```bash
   npm install
   ```

4. 🔑 Set up environment variables:

   Create a `.env` file in the root directory and add the required environment variables.
   
    ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
    
5. ▶️ Start the development server:

   ```bash
   npm run dev
   ```

6. 🌐 Access the application:

   Open your web browser and navigate to `http://localhost:3000` to access the AI Researcher Workplace client-side application.

For more detailed instructions and documentation, refer to the [client-side repository](https://github.com/koitran14/AI-researcher-workplace/tree/main/client).

## Server Side

The server-side API is responsible for managing user authentication, data storage, business logic, and advanced AI capabilities. It is built using:

- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **CORS**: Cross-Origin Resource Sharing middleware for FastAPI to handle requests from the client-side application.
- **SQLAlchemy**: A SQL toolkit and Object-Relational Mapping (ORM) library for Python, used for interacting with MySQL database.

### Advanced AI Capabilities

In addition to standard API functionalities, the server-side implements advanced natural language processing (NLP) capabilities using the BART-Large-MNLI model from Hugging Face. This model is part of the BART (Bidirectional and Auto-Regressive Transformers) family and is fine-tuned on the MultiNLI (Multi-Genre Natural Language Inference) dataset.

#### 🤖 Model Used: Facebook/BART-Large-MNLI by Hugging Face

- **Model Description**: BART-Large-MNLI is a variant of the BART model, which is pre-trained on large-scale text data using a denoising autoencoder objective. It has been fine-tuned on the MNLI dataset, which consists of natural language inference (NLI) tasks, including textual entailment and contradiction recognition.

- **Purpose**: The BART-Large-MNLI model is used to perform Zero-shot Classification, a technique that allows the model to predict the relationship between experts and users' current projects without the need for explicit training data. By leveraging the semantic understanding encoded in the BART model, the server-side API can suggest relevant experts based on project topics, expertise, and user preferences.

- **Implementation**: The BART-Large-MNLI model is integrated into the server-side API using the Hugging Face Transformers library, which provides a high-level interface for interacting with pre-trained NLP models. The model takes project descriptions, user profiles, and other relevant text inputs as input and produces inferred relationships between users and projects as output.

- **Benefits**: By utilizing the BART-Large-MNLI model, the AI Researcher Workplace platform can provide more accurate and personalized project recommendations, expert suggestions, and collaboration opportunities to researchers. This enhances the overall user experience and fosters productive collaboration within the research community.

#### Example Use Cases:

- **Project Recommendations**: The server-side API analyzes the description of a user's current project and leverages the BART-Large-MNLI model to identify similar projects or related topics. It then suggests relevant projects to the user for potential collaboration or reference.

- **Expert Suggestions**: Based on the expertise encoded in the BART-Large-MNLI model, the API identifies experts whose knowledge and skills align closely with the topics or domains of a user's project. It then recommends these experts to the user as potential collaborators or mentors.

- **Collaboration Opportunities**: By facilitating connections between users and projects through advanced AI capabilities, the AI Researcher Workplace platform enhances collaboration opportunities within the research community. Users can discover projects, find collaborators, and engage in meaningful research discussions more effectively.

### Getting Started

To run the server-side API locally:

1. 🌀 Clone the repository:

   ```bash
   git clone https://github.com/koitran14/AI-researcher-workplace.git
   ```

2. 📂 Navigate to the server directory:

   ```bash
   cd AI-researcher-workplace/server
   ```

3. ⚙️ Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. 🔑 Set up environment variables:

   Create a `.env` file in the root directory and add the required environment variables.
   
    ```bash
   SECRET_KEY=  'YOUR_SECRET_KEY_FOR_TOKEN'
   ALGORITHM= 'HS256'
   HUGGINGFACEHUB_API_TOKEN='YOUR_HUGGINFACE_SECRET_KEY'
   UPLOAD_DIRECTORY = "/uploads"
   ```

6. ▶️ Start the server:

   ```bash
   uvicorn main:app --reload
   ```

For more detailed instructions and documentation, refer to the [server-side repository](https://github.com/koitran14/AI-researcher-workplace/tree/main/server).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all contributors and open-source projects that made this project possible.
