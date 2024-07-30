import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateDeck from './components/deck/CreateDeck'
import StudyDeck from './components/deck/StudyDeck';
import ViewDeck from './components/deck/ViewDeck';
import DeckLayout from './components/deck/DeckLayout';
import CreateCard from "./components/card/CreateCard";
import EditDeck from "./components/deck/EditDeck";
import NotFound from "./Layout/NotFound"
import EditCard from "./components/card/EditCard"

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/decks/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId" element={<DeckLayout />}>
                <Route path="study" element={<StudyDeck />} />
                <Route path="edit" element={<EditDeck />} />
                <Route path="cards/new" element={<CreateCard />} />
                <Route path="cards/:cardId/edit" element={<EditCard />} />
                <Route path="" element={<ViewDeck />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RootRoutes;