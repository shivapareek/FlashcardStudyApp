# 📚 Flashcard Study App

A modern, full-stack flashcard application built with the MERN stack to help users study efficiently using digital flashcards organized by decks.

## 🎯 Objective

Help users study efficiently using flashcards organized by decks. This app digitizes and organizes traditional flashcard studying in a user-friendly, modern interface with smooth animations and intuitive navigation.

## 🚀 Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for modern, responsive design
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **API Communication**: Axios for HTTP requests
- **Routing**: React Router DOM for client-side routing

## 📋 Problem Statement

Traditional flashcard studying can be cumbersome and unorganized. Students often struggle with:
- Managing physical flashcards
- Organizing study materials by subject/topic
- Tracking study progress
- Accessing study materials from anywhere
- Losing or damaging physical cards

This app solves these problems by providing a digital platform that organizes flashcards into decks, offers smooth study experiences, and tracks progress.

## ✨ Features

### Core Features
- **Deck Management**: Create, view, edit, and delete flashcard decks
- **Flashcard Management**: Add, edit, and delete flashcards within decks
- **Study Mode**: Interactive study session with card flipping animations
- **Progress Tracking**: Visual progress indicators and study statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience Features
- **Smooth Animations**: CSS-based card flip animations and transitions
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Form Validation**: Client-side and server-side validation for data integrity
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during data operations
- **Study Tips**: Built-in tips for effective studying

### Technical Features
- **RESTful API**: Well-structured backend API with proper HTTP methods
- **Data Validation**: Input validation on both client and server
- **Error Handling**: Centralized error handling with meaningful messages
- **CORS Support**: Cross-origin resource sharing for development
- **Modular Architecture**: Clean, maintainable code structure

## 🖼️ Screenshots

### Dashboard View
*Screenshot placeholder: Dashboard showing list of flashcard decks with deck names, descriptions, and card counts*

### Deck View
*Screenshot placeholder: Individual deck page showing all flashcards with question/answer pairs and management options*

### Flashcard Flip Animation
*Screenshot placeholder: Study mode showing flashcard flip animation from question to answer*

## 🔗 Deployment

- **Live Demo**: [Deployment Link Placeholder]
- **GitHub Repository**: [GitHub Repo Link Placeholder]

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd FlashcardStudyApp
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flashcard-study-app
   NODE_ENV=development
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

7. **Start the frontend client**
   ```bash
   cd client
   npm start
   ```
   The client will start on `http://localhost:3000`

8. **Open your browser**
   
   Navigate to `http://localhost:3000` to use the application.

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

## 📁 Folder Structure

```
FlashcardStudyApp/
├── client/                     # React frontend
│   ├── public/                # Static assets
│   │   └── index.html         # HTML template
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   │   ├── Dashboard.js   # Main dashboard component
│   │   │   ├── DeckPage.js    # Individual deck view
│   │   │   ├── StudyMode.js   # Study session component
│   │   │   ├── FlashcardViewer.js # Card flip component
│   │   │   ├── FlashcardList.js # Card list component
│   │   │   ├── FlashcardForm.js # Card creation/edit form
│   │   │   ├── DeckForm.js    # Deck creation/edit form
│   │   │   ├── Header.js      # Navigation header
│   │   │   └── LoadingSpinner.js # Loading component
│   │   ├── services/          # API services
│   │   │   └── api.js         # Axios configuration
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # App entry point
│   │   └── index.css          # Global styles + Tailwind
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── postcss.config.js      # PostCSS configuration
├── server/                     # Node.js backend
│   ├── config/                # Configuration files
│   │   └── database.js        # MongoDB connection
│   ├── models/                # Mongoose models
│   │   ├── Deck.js            # Deck schema
│   │   └── Flashcard.js       # Flashcard schema
│   ├── routes/                # API routes
│   │   ├── decks.js           # Deck CRUD operations
│   │   └── flashcards.js      # Flashcard CRUD operations
│   ├── server.js              # Express server setup
│   └── package.json           # Backend dependencies
└── README.md                  # Project documentation
```

## 🗄️ Database Schema

### Deck Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  createdAt: Date (default: now),
  updatedAt: Date (auto-generated)
}
```

### Flashcard Collection
```javascript
{
  _id: ObjectId,
  question: String (required, max 1000 chars),
  answer: String (required, max 1000 chars),
  deckId: ObjectId (required, references Deck),
  createdAt: Date (default: now),
  updatedAt: Date (auto-generated)
}
```

## 🔌 API Endpoints

### Deck Endpoints
- `GET /api/decks` - Get all decks
- `GET /api/decks/:id` - Get specific deck
- `POST /api/decks` - Create new deck
- `PUT /api/decks/:id` - Update deck
- `DELETE /api/decks/:id` - Delete deck and all its flashcards

### Flashcard Endpoints
- `GET /api/flashcards/deck/:deckId` - Get all flashcards for a deck
- `GET /api/flashcards/:id` - Get specific flashcard
- `POST /api/flashcards` - Create new flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### Health Check
- `GET /api/health` - API health status

## 🎨 Key Components

### Dashboard Component
- Displays all flashcard decks in a responsive grid
- Shows deck information (name, description, card count)
- Provides quick actions (view, study, edit, delete)
- Handles deck creation and management

### Study Mode Component
- Interactive study session with progress tracking
- Card navigation (previous/next, jump to specific card)
- Shuffle and restart functionality
- Visual progress indicators

### Flashcard Viewer Component
- Smooth card flip animation using CSS transforms
- Question/answer display with clear visual distinction
- Click-to-flip interaction
- Study tips and guidance

### Form Components
- Comprehensive form validation
- Real-time character counting
- User-friendly error messages
- Loading states during submission

## 🎯 Usage Guide

1. **Creating Your First Deck**
   - Click "Create New Deck" on the dashboard
   - Enter a descriptive name and optional description
   - Click "Create Deck" to save

2. **Adding Flashcards**
   - Navigate to your deck
   - Click "Add New Card"
   - Enter your question and answer
   - Click "Create Card" to save

3. **Studying**
   - Click "Study" on any deck
   - Click cards to flip between question and answer
   - Use navigation controls to move between cards
   - Track your progress with the progress bar

4. **Managing Content**
   - Edit decks and cards using the edit buttons
   - Delete content using the delete buttons
   - All changes are saved automatically

## 🚀 Future Enhancements

- User authentication and personal decks
- Spaced repetition algorithm
- Study statistics and analytics
- Card difficulty ratings
- Import/export functionality
- Mobile app version
- Offline support with PWA
- Collaborative studying features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database
- Express.js team for the robust web framework
- All open-source contributors who made this project possible

---

**Happy Studying! 📚✨**
