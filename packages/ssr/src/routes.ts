import Home from './pages/Home'
import About from './pages/About'
import ArticleDetail from "./pages/ArticleDetail";
import Demo from './pages/Demo'
import Tags from './pages/Tags'
import Archive from './pages/Archive'
import Version from './pages/Version'
import Friend from './pages/Friend'
import Books from './pages/Books'
import MessageBoard from './pages/MessageBoard'

import NotFound from './pages/404'

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/demo',
        component: Demo
    },
    {
        path: '/article/:title',
        component: ArticleDetail
    },
    {
        path: '/tags',
        component: Tags
    },
    {
        path: '/archive',
        component: Archive
    },
    {
        path: '/archive/:name',
        component: Archive
    },
    {
        path: '/version',
        component: Version
    },
    {
        path: '/friends',
        component: Friend
    },
    {
        path: '/book',
        component: Books
    },
    {
        path: '/message',
        component: MessageBoard
    },
    {
        component: NotFound
    }
]
