## WEBSITE:
[This is an link to summaraize.utkarshsharma.tech hosted on render.com](https://summaraize.utkarshsharma.tech/)

## Running the Project on Your Own System

To run this project on your own system, you'll need to set up a `.env` file with the following environment variables:

- **Hugging Face Token:** `HUGGING_FACE_API_KEY=your-hugging-face-api-key-here`
- **MongoDB URI:** `MONGO_URI=your-mongodb-key-here`

### Prerequisites

Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)

### Instructions to Run

1. Open a terminal and navigate to the root directory of this project.
2. Install the required npm packages by running the following command:
   
    ```sh
    npm install dotenv express axios body-parser cors
    ```
4. Start the server by running:
   
    ```sh
    node server.js
    ```
