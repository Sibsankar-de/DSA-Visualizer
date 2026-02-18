import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import Contact from './pages/Contact';
import VisualizerPage from './pages/VisualizerPage';
import LinkedListVisualizerPage from './pages/LinkedListVisualizerPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// UPDATED IMPORTS: Including both CPP and Java versions
import { bubbleSortCPP, bubbleSortJava } from './algorithms/bubbleSort';
import { selectionSortCPP, selectionSortJava } from './algorithms/selectionSort';
import { quickSortCPP, quickSortJava } from './algorithms/quickSort';
import { linearSearchCPP, linearSearchJava } from './algorithms/linearSearch';
import { radixSortCPP, radixSortJava } from './algorithms/radixSort';
import { heapSortCPP, heapSortJava } from './algorithms/heapSort';
import { insertionSortCPP, insertionSortJava } from './algorithms/insertionSort';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
        <Navbar />

        <main className="block">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* UPDATED ROUTES: Passing both cppSnippet and javaSnippet */}
            <Route
              path="/visualizer/bubble-sort"
              element={<VisualizerPage name="Bubble Sort" cppSnippet={bubbleSortCPP} javaSnippet={bubbleSortJava} />}
            />
            <Route
              path="/visualizer/selection-sort"
              element={<VisualizerPage name="Selection Sort" cppSnippet={selectionSortCPP} javaSnippet={selectionSortJava} />}
            />
            <Route
              path="/visualizer/quick-sort"
              element={<VisualizerPage name="Quick Sort" cppSnippet={quickSortCPP} javaSnippet={quickSortJava} />}
            />
            <Route
              path="/visualizer/linear-search"
              element={<VisualizerPage name="Linear Search" cppSnippet={linearSearchCPP} javaSnippet={linearSearchJava} />}
            />
            <Route
              path="/visualizer/radix-sort"
              element={<VisualizerPage name="Radix Sort" cppSnippet={radixSortCPP} javaSnippet={radixSortJava} />}
            />
            <Route
              path="/visualizer/heap-sort"
              element={<VisualizerPage name="Heap Sort" cppSnippet={heapSortCPP} javaSnippet={heapSortJava} />}
            />
            <Route 
              path="/visualizer/insertion-sort" 
              element={<VisualizerPage name="Insertion Sort" cppSnippet={insertionSortCPP} javaSnippet={insertionSortJava} />} 
            />
            <Route
              path="/visualizer/linked-list"
              element={<LinkedListVisualizerPage />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}