

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Algorithms from "./pages/Algorithms";
import Contact from "./pages/Contact";
import VisualizerPage from "./pages/VisualizerPage";
import LinkedListVisualizerPage from "./pages/LinkedListVisualizerPage";
import GraphVisualizerPage from "./pages/GraphVisualizerPage";
import PrimsVisualizerPage from "./pages/PrimsVisualizerPage";
import DijkstraPage from "./pages/DijkstraPage";
import KruskalPage from "./pages/KruskalPage";
import AStarPage from "./pages/AStarPage";
import StackVisualizerPage from "./pages/StackVisualizerPage";
import SignIn from "./pages/SignIn";
import TopologicalSortPage from "./pages/TopologicalSortPage";
import SignUp from "./pages/SignUp";
import HuffmanCodingPage from "./pages/HuffmanCodingPage";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP";
import BoyerMoorePage from "./pages/BoyerMoorePage";
import OAuthSuccess from "./pages/OAuthSuccess";
import FloydWarshallPage from "./pages/FloydWarshallPage";
import ComparisonPage from "./pages/ComparisonPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// UPDATED IMPORTS: Including both CPP and Java versions
import {
  bubbleSortCPP,
  bubbleSortJava,
  bubbleSortPython,
  bubbleSortJS,
} from "./algorithms/bubbleSort";
import {
  selectionSortCPP,
  selectionSortJava,
  selectionSortPython,
  selectionSortJS,
} from "./algorithms/selectionSort";
import {
  quickSortCPP,
  quickSortJava,
  quickSortPython,
  quickSortJS,
} from "./algorithms/quickSort";
import {
  linearSearchCPP,
  linearSearchJava,
  linearSearchPython,
  linearSearchJS,
} from "./algorithms/linearSearch";
import {
  interpolationSearchCPP,
  interpolationSearchJava,
  interpolationSearchPython,
  interpolationSearchJS,
} from "./algorithms/interpolationSearch";
import {
  radixSortCPP,
  radixSortJava,
  radixSortPython,
  radixSortJS,
} from "./algorithms/radixSort";
import {
  heapSortCPP,
  heapSortJava,
  heapSortPython,
  heapSortJS,
} from "./algorithms/heapSort";
import {
  insertionSortCPP,
  insertionSortJava,
  insertionSortPython,
  insertionSortJS,
} from "./algorithms/insertionSort";
import {
  mergeSortCPP,
  mergeSortJava,
  mergeSortPython,
  mergeSortJS,

} from './algorithms/mergeSort';
import {
  binarySearchCPP,
  binarySearchJava,
  binarySearchPython,
  binarySearchJS
} from "./algorithms/binarySearch";
import { dfsCPP, dfsJava } from "./algorithms/dfs";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
          <Navbar />

          <main className="block">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/algorithms" element={<ProtectedRoute><Algorithms /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
              <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordEmail /></PublicRoute>} />
              <Route path="/forgot-password/otp" element={<PublicRoute><ForgotPasswordOTP /></PublicRoute>} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />

              {/* UPDATED ROUTES: Passing both cppSnippet, javaSnippet, and pythonSnippet */}
              <Route
                path="/visualizer/bubble-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Bubble Sort"
                      cppSnippet={bubbleSortCPP}
                      javaSnippet={bubbleSortJava}
                      pythonSnippet={bubbleSortPython}
                      jsSnippet={bubbleSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/boyer-moore"
                element={<ProtectedRoute><BoyerMoorePage /></ProtectedRoute>}
              />
              <Route path="/visualizer/prims" element={<ProtectedRoute><PrimsVisualizerPage /></ProtectedRoute>} />
              <Route path="/visualizer/astar" element={<ProtectedRoute><AStarPage /></ProtectedRoute>} />
              <Route
                path="/visualizer/selection-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Selection Sort"
                      cppSnippet={selectionSortCPP}
                      javaSnippet={selectionSortJava}
                      pythonSnippet={selectionSortPython}
                      jsSnippet={selectionSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/quick-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Quick Sort"
                      cppSnippet={quickSortCPP}
                      javaSnippet={quickSortJava}
                      pythonSnippet={quickSortPython}
                      jsSnippet={quickSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/linear-search"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Linear Search"
                      cppSnippet={linearSearchCPP}
                      javaSnippet={linearSearchJava}
                      pythonSnippet={linearSearchPython}
                      jsSnippet={linearSearchJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/binary-search"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Binary Search"
                      cppSnippet={binarySearchCPP}
                      javaSnippet={binarySearchJava}
                      pythonSnippet={binarySearchPython}
                      jsSnippet={binarySearchJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/interpolation-search"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Interpolation Search"
                      cppSnippet={interpolationSearchCPP}
                      javaSnippet={interpolationSearchJava}
                      pythonSnippet={interpolationSearchPython}
                      jsSnippet={interpolationSearchJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/radix-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Radix Sort"
                      cppSnippet={radixSortCPP}
                      javaSnippet={radixSortJava}
                      pythonSnippet={radixSortPython}
                      jsSnippet={radixSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/heap-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Heap Sort"
                      cppSnippet={heapSortCPP}
                      javaSnippet={heapSortJava}
                      pythonSnippet={heapSortPython}
                      jsSnippet={heapSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/insertion-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage
                      name="Insertion Sort"
                      cppSnippet={insertionSortCPP}
                      javaSnippet={insertionSortJava}
                      pythonSnippet={insertionSortPython}
                      jsSnippet={insertionSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/visualizer/linked-list"
                element={<ProtectedRoute><LinkedListVisualizerPage /></ProtectedRoute>}
              />
              <Route
                path="/visualizer/merge-sort"
                element={
                  <ProtectedRoute>
                    <VisualizerPage name="Merge Sort"
                      cppSnippet={mergeSortCPP}
                      javaSnippet={mergeSortJava}
                      pythonSnippet={mergeSortPython}
                      jsSnippet={mergeSortJS}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/visualizer/dijkstra" element={<ProtectedRoute><DijkstraPage /></ProtectedRoute>} />
              <Route path="/visualizer/kruskal" element={<ProtectedRoute><KruskalPage /></ProtectedRoute>} />
              <Route path="/visualizer/dfs" element={<ProtectedRoute><GraphVisualizerPage /></ProtectedRoute>} />
              <Route path="/visualizer/topological-sort" element={<ProtectedRoute><TopologicalSortPage /></ProtectedRoute>} />
              <Route path="/visualizer/huffman-coding" element={<ProtectedRoute><HuffmanCodingPage /></ProtectedRoute>} />
              <Route path="/visualizer/floyd-warshall" element={<ProtectedRoute><FloydWarshallPage /></ProtectedRoute>} />
              <Route path="/visualizer/stack" element={<ProtectedRoute><StackVisualizerPage /></ProtectedRoute>} />
              <Route path="/compare" element={<ProtectedRoute><ComparisonPage /></ProtectedRoute>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
