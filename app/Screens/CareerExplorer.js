import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Svg, Circle, Text as SvgText, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { PanResponder } from 'react-native';

// Mock data for job categories
const generateMockCategories = () => {
  const categories = [
    { id: 1, name: 'Bartenders', count: 12, sector: 'Service' },
    { id: 2, name: 'Administrative officers', count: 27, sector: 'Service' },
    { id: 3, name: 'Restaurant and food service', count: 31, sector: 'Tourism & Hospitality' },
    { id: 4, name: 'Administrative assistants', count: 30, sector: 'Service' },
    { id: 5, name: 'Material handlers', count: 18, sector: 'Manufacturing' },
    { id: 6, name: 'Mechanical engineering technologists', count: 6, sector: 'Manufacturing' },
    { id: 7, name: 'Chefs', count: 12, sector: 'Tourism & Hospitality' },
    { id: 8, name: 'Food and beverage servers', count: 16, sector: 'Tourism & Hospitality' },
    { id: 9, name: 'Retail and wholesale buyers', count: 7, sector: 'Finance & Retail' },
    { id: 10, name: 'Financial advisors', count: 10, sector: 'Finance & Retail' },
    { id: 11, name: 'Carpenters', count: 9, sector: 'Construction' },
    { id: 12, name: 'Banking, credit and investment', count: 6, sector: 'Finance & Retail' },
    { id: 13, name: 'University professors and lecturers', count: 14, sector: 'Education & Social Services' },
    { id: 14, name: 'Receptionists', count: 19, sector: 'Service' },
    { id: 15, name: 'Industrial engineering and manufacturing', count: 8, sector: 'Manufacturing' },
    { id: 16, name: 'Civil engineers', count: 5, sector: 'Construction' },
    { id: 17, name: 'Painters and decorators', count: 4, sector: 'Construction' },
    { id: 18, name: 'Other customer and information services', count: 20, sector: 'Service' },
    { id: 19, name: 'Landscaping and grounds maintenance', count: 10, sector: 'Service' },
    { id: 20, name: 'Machine operators of metal', count: 6, sector: 'Manufacturing' },
    { id: 21, name: 'Architects', count: 7, sector: 'Construction' },
    { id: 22, name: 'Transport truck drivers', count: 44, sector: 'Transportation' },
    { id: 23, name: 'Financial sales representatives', count: 8, sector: 'Finance & Retail' },
    { id: 24, name: 'Food service supervisors', count: 15, sector: 'Tourism & Hospitality' },
    { id: 25, name: 'Medical administrative assistants', count: 18, sector: 'Healthcare' },
    { id: 26, name: 'Veterinarians', count: 4, sector: 'Healthcare' },
    { id: 27, name: 'Journalists', count: 3, sector: 'Information & Communications Technology' },
    { id: 28, name: 'Electricians', count: 22, sector: 'Construction' },
    { id: 29, name: 'Fishing vessel deckhands', count: 5, sector: 'Agriculture' },
    { id: 30, name: 'Forestry workers', count: 7, sector: 'Agriculture' },
    { id: 31, name: 'Editors', count: 3, sector: 'Information & Communications Technology' },
    { id: 32, name: 'Welders', count: 16, sector: 'Manufacturing' },
    { id: 33, name: 'Boilermakers', count: 4, sector: 'Manufacturing' },
    { id: 34, name: 'Supervisors in railway transport', count: 8, sector: 'Transportation' },
    { id: 35, name: 'Customer service representatives', count: 35, sector: 'Service' },
    { id: 36, name: 'Retail and wholesale managers', count: 25, sector: 'Finance & Retail' },
    { id: 37, name: 'Oil and gas drilling workers', count: 11, sector: 'Manufacturing' },
    { id: 38, name: 'Computer programmers', count: 33, sector: 'Information & Communications Technology' },
    { id: 39, name: 'Nursing assistants', count: 27, sector: 'Healthcare' },
    { id: 40, name: 'Elementary teachers', count: 19, sector: 'Education & Social Services' },
    { id: 41, name: 'Pharmacists', count: 8, sector: 'Healthcare' },
    { id: 42, name: 'Social workers', count: 12, sector: 'Education & Social Services' },
    { id: 43, name: 'Bricklayers', count: 6, sector: 'Construction' },
    { id: 44, name: 'Marketing specialists', count: 14, sector: 'Information & Communications Technology' },
    { id: 45, name: 'Air pilots and flight engineers', count: 7, sector: 'Transportation' },
    { id: 46, name: 'Landscape architects', count: 3, sector: 'Construction' },
    { id: 47, name: 'Cooks', count: 23, sector: 'Tourism & Hospitality' },
    { id: 48, name: 'Paramedics', count: 9, sector: 'Healthcare' },
    { id: 49, name: 'Library technicians', count: 5, sector: 'Education & Social Services' },
    { id: 50, name: 'Fish and seafood workers', count: 6, sector: 'Agriculture' },
    { id: 51, name: 'Insurance agents', count: 8, sector: 'Finance & Retail' },
    { id: 52, name: 'Industrial electricians', count: 17, sector: 'Manufacturing' },
    { id: 53, name: 'Physicians', count: 12, sector: 'Healthcare' },
    { id: 54, name: 'Executive assistants', count: 13, sector: 'Service' },
    { id: 55, name: 'Automotive technicians', count: 18, sector: 'Service' },
    { id: 56, name: 'Web designers', count: 16, sector: 'Information & Communications Technology' },
    { id: 57, name: 'Elementary school teachers', count: 21, sector: 'Education & Social Services' },
    { id: 58, name: 'Construction managers', count: 15, sector: 'Construction' },
    { id: 59, name: 'Database administrators', count: 9, sector: 'Information & Communications Technology' },
    { id: 60, name: 'Dental hygienists', count: 7, sector: 'Healthcare' },
    { id: 61, name: 'Financial analysts', count: 11, sector: 'Finance & Retail' },
    { id: 62, name: 'Hotel managers', count: 8, sector: 'Tourism & Hospitality' },
    { id: 63, name: 'Human resources specialists', count: 14, sector: 'Service' },
    { id: 64, name: 'Network administrators', count: 13, sector: 'Information & Communications Technology' },
    { id: 65, name: 'Police officers', count: 10, sector: 'Service' },
    { id: 66, name: 'Plumbers', count: 19, sector: 'Construction' },
    { id: 67, name: 'Real estate agents', count: 17, sector: 'Finance & Retail' },
    { id: 68, name: 'Software developers', count: 42, sector: 'Information & Communications Technology' },
    { id: 69, name: 'Travel agents', count: 6, sector: 'Tourism & Hospitality' },
    { id: 70, name: 'Urban planners', count: 4, sector: 'Construction' },
    { id: 71, name: 'Veterinary technicians', count: 5, sector: 'Healthcare' },
    { id: 72, name: 'Heavy equipment operators', count: 16, sector: 'Construction' },
    { id: 73, name: 'Accountants', count: 22, sector: 'Finance & Retail' },
    { id: 74, name: 'Data scientists', count: 18, sector: 'Information & Communications Technology' },
    { id: 75, name: 'Fitness instructors', count: 11, sector: 'Service' },
  ];

  // Add descriptions, skills, and salary info to each category
  return categories.map(category => {
    return {
      ...category,
      description: `${category.name} are professionals who work in the ${category.sector} sector. They provide specialized services and require specific skills for their roles.`,
      skills: ['Communication', 'Teamwork', 'Problem-solving', 'Attention to detail', 'Technical expertise'],
      salary: `$${Math.floor(Math.random() * 40000) + 30000} - $${Math.floor(Math.random() * 50000) + 60000}`,
      isRelated: Math.random() > 0.7,  // Random related flag for demonstration
    };
  }  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50, 
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#213E64',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 40, // Reduced from 50 to give more viewing area
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 5,
    alignItems: 'center',
    gap: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 35,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#213E64',
    height: '100%',
  },
  backButton: {
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#213E64',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 4, // Add space between icon and text
  },
  filterButtonText: {
    marginLeft: 5,
    color: '#213E64',
  },
  searchButton: {},
  explorerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  svgContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#213E64',
    fontSize: 16,
  },
  filterModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  filterModalContent: {
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213E64',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213E64',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  searchInput: {
    flex: 1,
    padding: 12,
  },
  searchIcon: {
    padding: 10,
  },
  sectorDropdown: {
    marginBottom: 5,
  },
  bubbleSizeDropdown: {
    marginBottom: 5,
  },
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  dropdownOptions: {
    maxHeight: 150,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  resetButton: {
    backgroundColor: '#213E64',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    maxHeight: 300,
  },
  detailsHeader: {
    marginBottom: 15,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213E64',
  },
  detailsSubtitle: {
    fontSize: 14,
    color: '#649A47',
    fontWeight: '600',
  },
  detailSection: {
    marginBottom: 15,
  },
  detailSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#213E64',
  },
  detailContent: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    paddingVertical: 5,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
  },
  skillItem: {
    backgroundColor: '#F0F7EC',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  skillText: {
    color: '#649A47',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#649A47',
    paddingTop: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: '#213E64',
  },
  activeNavText: {
    color: '#649A47',
    fontWeight: 'bold',
  },
  // Modal related styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#213E64',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedOption: {
    backgroundColor: '#F0F7EC',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledOptionText: {
    color: '#999999',
  },
  sectorList: {
    maxHeight: 400,
  },
  sectorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedSector: {
    backgroundColor: '#F0F7EC',
  },
  sectorText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedSectorText: {
    color: '#649A47',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '80%', // Ensure it doesn't get too tall
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#213E64',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 15,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  applyButton: {
    backgroundColor: '#213E64',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#649A47',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectorScrollView: {
    maxHeight: 200, // Limit height so it doesn't take up too much space
  },
  sectorOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  selectedSectorOption: {
    backgroundColor: '#F0F7EC',
  },
  sectorText: {
    fontSize: 16,
    color: '#333333',
  },
});

// List of sectors for filtering
const SECTORS = [
  'Apprenticeships', 
  'Construction', 
  'Manufacturing', 
  'Finance & Retail', 
  'Service', 
  'Agriculture', 
  'Tourism & Hospitality', 
  'Healthcare', 
  'Education & Social Services', 
  'Transportation', 
  'Information & Communications Technology'
];

// Define the trending threshold
const TRENDING_THRESHOLD = 15;

const CareerExplorer = ({ navigation }) => {
  const [categories, setCategories] = useState(generateMockCategories());
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [bubbleSizeOption, setBubbleSizeOption] = useState('Equal');
  const [showFilters, setShowFilters] = useState(false);
  const [showSectorSelector, setShowSectorSelector] = useState(false);
  const [bubbleSizeModal, setBubbleSizeModal] = useState(false);
  const [detailsActive, setDetailsActive] = useState({
    description: false,
    skills: false,
    salary: false,
  });
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [lastScale, setLastScale] = useState(1);
  
  // Position for each bubble
  const [bubblePositions, setBubblePositions] = useState([]);
  
  // Reference for SVG
  const svgRef = useRef(null);
  const panRef = useRef(new Animated.ValueXY()).current;

  // For pinch to zoom functionality
  const initDistance = useRef(0);
  const prevDistance = useRef(0);
  const isPinching = useRef(false);

  // Helper to smoothly update scale for better transitions
  const updateScaleWithAnimation = (newScale) => {
    // Simple direct state update - no animation needed
    setScale(newScale);
    setLastScale(newScale);
  };

  // Generate positions for bubbles that don't overlap
  useEffect(() => {
    setLoading(true);
    
    // Use setTimeout to prevent UI from freezing during calculation
    setTimeout(() => {
      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2.5;
      const positions = [];
      
      const filteredCategories = filterCategories();
      
      // Function to check if position overlaps with existing ones
      const doesOverlap = (x, y, radius, positions) => {
        for (const pos of positions) {
          const dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
          if (dist < radius + pos.radius + 5) { // 5px buffer
            return true;
          }
        }
        return false;
      };
      
      // Generate positions for each category bubble
      filteredCategories.forEach((category, i) => {
        // Determine radius based on bubble size option
        let radius;
        if (bubbleSizeOption === 'Job Openings') {
          radius = 30 + (category.count / 3); // Scale by job count
        } else {
          radius = 70; // Equal size for all
        }
        
        // Cap min/max size
        radius = Math.max(50, Math.min(radius, 100));
        
        // Try to find non-overlapping position
        let x, y;
        let attempts = 0;
        let placed = false;
        
        while (!placed && attempts < 100) {
          // Spiral placement pattern
          const angle = (i * 0.6) % (2 * Math.PI);
          const distance = 50 + (attempts * 15) + (i * 4);
          
          x = centerX + distance * Math.cos(angle);
          y = centerY + distance * Math.sin(angle);
          
          if (!doesOverlap(x, y, radius, positions)) {
            positions.push({ x, y, radius, category });
            placed = true;
          }
          
          attempts++;
        }
        
        // If we couldn't place it, just put it somewhere
        if (!placed) {
          x = centerX + Math.random() * width * 0.6 - width * 0.3;
          y = centerY + Math.random() * height * 0.6 - height * 0.3;
          positions.push({ x, y, radius, category });
        }
      });
      
      setBubblePositions(positions);
      setLoading(false);

      // Set initial scale to make bubbles more visible - add this line:
      if (lastScale === 1 && scale === 1) {
        setScale(3);
        setLastScale(3);
      } 
    }, 100);
  }, [categories, searchKeyword, selectedSector, bubbleSizeOption]);

  // Calculate distance between two touch points
  const distance = (touches) => {
    if (touches.length < 2) return 0;
    
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Set up pan responder for dragging and zooming
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        panRef.setOffset({
          x: panRef.x._value,
          y: panRef.y._value,
        });
        panRef.setValue({ x: 0, y: 0 });
        
        // Initialize pinch gesture
        if (evt.nativeEvent.touches.length === 2) {
          const dist = distance(evt.nativeEvent.touches);
          initDistance.current = dist;
          isPinching.current = true;
        } else {
          isPinching.current = false;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Handle pinch to zoom
        if (evt.nativeEvent.touches.length === 2) {
          const dist = distance(evt.nativeEvent.touches);
          
          if (initDistance.current === 0) {
            initDistance.current = dist;
            return;
          }
          
          // Calculate scaling factor by comparing with initial distance
          const scaleDelta = dist / initDistance.current;
          
          // Increase max zoom limit from 3 to 5
          const newScale = Math.max(0.5, Math.min(5, lastScale * scaleDelta));
          
          setScale(newScale);
        } 
        // Handle panning when not pinching
        else if (!isPinching.current) {
          panRef.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        }
      },
      onPanResponderRelease: () => {
        // Only update lastScale if we were actually pinching
        if (isPinching.current) {
          setLastScale(scale);
        }
        
        // Reset pinch state
        initDistance.current = 0;
        isPinching.current = false;
        
        panRef.flattenOffset();
      },
    })
  ).current;

// Reference for tracking double taps
const lastTapTimeRef = useRef(0);
const doubleTapTimeout = useRef(null);

// Function to handle double tap reset
const handleDoubleTap = (event) => {
  const now = Date.now();
  const DOUBLE_TAP_DELAY = 300;
  
  if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
    // Clear pending single-tap actions
    clearTimeout(doubleTapTimeout.current);
    
    // Reset zoom and position directly without animation
    setScale(1.5); // Reset to default enlarged view, not 1
    setLastScale(1.5);
    panRef.setValue({ x: 0, y: 0 });
  } else {
    // Set up to detect second tap
    lastTapTimeRef.current = now;
    
    // Use timeout to separate single taps from double taps
    doubleTapTimeout.current = setTimeout(() => {
      // This was a single tap, no action needed
    }, DOUBLE_TAP_DELAY);
  }
};

  // Filter categories based on search and sector filter
  const filterCategories = () => {
    return categories.filter(category => {
      // Apply search filter
      const matchesSearch = searchKeyword === '' || 
        category.name.toLowerCase().includes(searchKeyword.toLowerCase());
      
      // Apply sector filter
      const matchesSector = selectedSector === '' || 
        category.sector === selectedSector;
      
      return matchesSearch && matchesSector;
    });
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory?.id ? null : category);
  };

  // Toggle filter view
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Open sector selector modal
  const openSectorSelector = () => {
    setShowSectorSelector(true);
  };

  // Open bubble size selector modal
  const toggleBubbleSizeModal = () => {
    setBubbleSizeModal(!bubbleSizeModal);
  };

  // Set bubble size option
  const selectBubbleSize = (option) => {
    setBubbleSizeOption(option);
    setBubbleSizeModal(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedSector('');
    setBubbleSizeOption('Equal');
    setScale(1);
    setLastScale(1);
  };
  
  // Toggle detail sections
  const toggleDetailSection = (section) => {
    setDetailsActive({
      ...detailsActive,
      [section]: !detailsActive[section]
    });
  };

  // Sector selector component
  const SectorSelector = ({ 
    visible, 
    sectors, 
    selectedSector, 
    onSelectSector, 
    onClose 
  }) => {
    return (
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.modalOverlay}
          onPress={onClose}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Sector</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#213E64" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sectorList}>
              <TouchableOpacity
                style={[
                  styles.sectorItem,
                  selectedSector === '' && styles.selectedSector
                ]}
                onPress={() => {
                  onSelectSector('');
                  onClose();
                }}
              >
                <Text style={[
                  styles.sectorText,
                  selectedSector === '' && styles.selectedSectorText
                ]}>
                  Show All Sectors
                </Text>
                {selectedSector === '' && (
                  <Ionicons name="checkmark" size={18} color="#649A47" />
                )}
              </TouchableOpacity>
              
              {sectors.map((sector) => (
                <TouchableOpacity
                  key={sector}
                  style={[
                    styles.sectorItem,
                    selectedSector === sector && styles.selectedSector
                  ]}
                  onPress={() => {
                    onSelectSector(sector);
                    onClose();
                  }}
                >
                  <Text style={[
                    styles.sectorText,
                    selectedSector === sector && styles.selectedSectorText
                  ]}>
                    {sector}
                  </Text>
                  {selectedSector === sector && (
                    <Ionicons name="checkmark" size={18} color="#649A47" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  // function to wrap text within the cluster "bubbles"
  const wrapText = (text, radius) => {
    if (!text) return [];
    
    // Calculate max chars per line based on radius
    // Approximate 6px per character for average font
    const maxCharsPerLine = Math.floor(radius / 4);
    
    // Don't wrap very short text
    if (text.length <= maxCharsPerLine) return [text];
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      // Test if adding this word exceeds the max line length
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      
      if (testLine.length <= maxCharsPerLine) {
        currentLine = testLine;
      } else {
        // If currentLine is not empty, push it and start a new line
        if (currentLine) {
          lines.push(currentLine);
        }
        // If the word itself is too long, truncate it
        if (word.length > maxCharsPerLine) {
          currentLine = word.substring(0, maxCharsPerLine-3) + '...';
        } else {
          currentLine = word;
        }
      }
    });
    
    // Add the last line
    if (currentLine) {
      lines.push(currentLine);
    }
    
    // Limit to 3 lines maximum
    if (lines.length > 3) {
      lines.splice(3);
      const lastLine = lines[2];
      if (lastLine.length > maxCharsPerLine - 3) {
        lines[2] = lastLine.substring(0, maxCharsPerLine - 3) + '...';
      } else {
        lines[2] = lastLine + '...';
      }
    }
    
    return lines;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Top row with back button and title */}
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#213E64" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Explorer</Text>
        </View>
        
        {/* Search and Filter row */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              placeholder="Search by Keyword..."
              style={styles.searchInput}
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={toggleFilters}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.filterText}>Filters</Text>
              <Ionicons name="funnel" size={14} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleFilters}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={toggleFilters}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()} // Prevent closing when tapping on the content
          >
            <View style={styles.modalHeader}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity onPress={toggleFilters}>
                <Ionicons name="close" size={24} color="#213E64" />
              </TouchableOpacity>
            </View>

            {/* Sector Filter Section - now a direct selector in the popup */}
            <Text style={styles.filterLabel}>FILTER BY SECTOR</Text>
            <ScrollView style={styles.sectorScrollView}>
              <TouchableOpacity
                style={[
                  styles.sectorOption,
                  selectedSector === '' && styles.selectedSectorOption
                ]}
                onPress={() => setSelectedSector('')}
              >
                <Text style={styles.sectorText}>Show All Sectors</Text>
                {selectedSector === '' && (
                  <Ionicons name="checkmark" size={18} color="#649A47" />
                )}
              </TouchableOpacity>
              
              {SECTORS.map((sector) => (
                <TouchableOpacity
                  key={sector}
                  style={[
                    styles.sectorOption,
                    selectedSector === sector && styles.selectedSectorOption
                  ]}
                  onPress={() => setSelectedSector(sector)}
                >
                  <Text style={styles.sectorText}>{sector}</Text>
                  {selectedSector === sector && (
                    <Ionicons name="checkmark" size={18} color="#649A47" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Bubble Size Options Section */}
            <Text style={styles.filterLabel}>BUBBLE SIZE OPTIONS</Text>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={toggleBubbleSizeModal}
            >
              <Text>Size by {bubbleSizeOption}</Text>
              <Ionicons name="chevron-down" size={20} color="#213E64" />
            </TouchableOpacity>

            {/* Button Row */}
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={toggleFilters}
              >
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => {
                  resetFilters();
                  toggleFilters();
                }}
              >
                <Text style={styles.buttonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Sector Selector Modal */}
      <SectorSelector
        visible={showSectorSelector}
        sectors={SECTORS}
        selectedSector={selectedSector}
        onSelectSector={setSelectedSector}
        onClose={() => setShowSectorSelector(false)}
      />

      {/* Bubble Size Selector Modal */}
      <Modal
        visible={bubbleSizeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setBubbleSizeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bubble Size Options</Text>
              <TouchableOpacity onPress={() => setBubbleSizeModal(false)}>
                <Ionicons name="close" size={24} color="#213E64" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[
                styles.modalOption,
                bubbleSizeOption === 'Equal' && styles.selectedOption
              ]}
              onPress={() => selectBubbleSize('Equal')}
            >
              <Text style={styles.modalOptionText}>Equal Size</Text>
              {bubbleSizeOption === 'Equal' && (
                <Ionicons name="checkmark" size={20} color="#649A47" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalOption,
                bubbleSizeOption === 'Job Openings' && styles.selectedOption
              ]}
              onPress={() => selectBubbleSize('Job Openings')}
            >
              <Text style={styles.modalOptionText}>By Job Openings</Text>
              {bubbleSizeOption === 'Job Openings' && (
                <Ionicons name="checkmark" size={20} color="#649A47" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalOption,
                bubbleSizeOption === 'Median Salary' && styles.selectedOption,
                styles.disabledOption
              ]}
              onPress={() => {
                // This option is disabled as mentioned in requirements
                alert('Median Salary data will be available in future updates.');
              }}
            >
              <Text style={[
                styles.modalOptionText,
                styles.disabledOptionText
              ]}>By Median Salary (Coming Soon)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Main Content Area */}
      <View 
        style={styles.explorerContainer}
        {...panResponder.panHandlers}
        onTouchEnd={handleDoubleTap} // adding a handler for the onTouchEnd style
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#213E64" />
            <Text style={styles.loadingText}>Generating career bubbles...</Text>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.svgContainer,
              {
                transform: [
                  { translateX: panRef.x },
                  { translateY: panRef.y },
                  { scale: scale },
                  { perspective: 1000 }
                ]
              }
            ]}
          >
            <Svg
              ref={svgRef}
              width="100%" 
              height="100%"
              viewBox={`-${Dimensions.get('window').width/1.5} -${Dimensions.get('window').height/1.5} ${Dimensions.get('window').width * 4} ${Dimensions.get('window').height * 4}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              {bubblePositions.map((pos, index) => {
                const isTrending = pos.category.count >= TRENDING_THRESHOLD;
                const isSelected = selectedCategory?.id === pos.category.id;
                const isRelated = selectedCategory && pos.category.isRelated && selectedCategory.id !== pos.category.id;
                
                // Calculate appropriate text size based on radius
                const baseFontSize = Math.min(pos.radius / 2, 800 / pos.category.name.length);
                const fontSize = Math.min(baseFontSize, 16); // Cap font size
                
                // Get wrapped text lines
                const textLines = wrapText(pos.category.name, pos.radius);
                
                return (
                  <G key={index}>
                    {/* Background fill circle */}
                    <Circle
                      cx={pos.x}
                      cy={pos.y}
                      r={pos.radius}
                      fill={isTrending ? '#213E64' : 'white'}
                      stroke="none"
                    />
                    
                    {/* Main Circle border */}
                    <Circle
                      cx={pos.x}
                      cy={pos.y}
                      r={pos.radius}
                      fill="none"
                      stroke={isRelated ? '#649A47' : '#213E64'}
                      strokeWidth={isSelected || isRelated ? 3 : 2}
                      vectorEffect="non-scaling-stroke"
                      onPress={() => handleCategorySelect(pos.category)}
                    />
                    
                    {/* Render wrapped text lines */}
                    {textLines.map((line, lineIndex) => {
                      // Calculate vertical position for each line
                      const lineCount = textLines.length;
                      const lineHeight = fontSize * 1.2; // Add some line spacing
                      const totalHeight = lineCount * lineHeight;
                      const yOffset = (lineIndex - (lineCount - 1) / 2) * lineHeight;
                      
                      return (
                        <SvgText
                          key={`text-${index}-${lineIndex}`}
                          x={pos.x}
                          y={pos.y + yOffset}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fontSize={fontSize}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fill={isTrending ? 'white' : '#213E64'}
                          stroke={isTrending ? 'none' : 'rgba(255,255,255,0.5)'}
                          strokeWidth="1"
                        >
                          {line}
                        </SvgText>
                      );
                    })}
                    
                    {/* Count Bubble - INCREASED SIZE */}
                    <Circle
                      cx={pos.x}
                      cy={pos.y + pos.radius - 16} // Adjusted position
                      r={24} // Increased from 16 to 24
                      fill="#649A47"
                    />
                    
                    {/* Count Text - INCREASED SIZE */}
                    <SvgText
                      x={pos.x}
                      y={pos.y + pos.radius - 16} // Adjusted position
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fontSize={16} // Increased from 12 to 16
                      fontWeight="bold"
                      fill="white"
                      stroke="none"
                    >
                      {pos.category.count}
                    </SvgText>
                  </G>
                );
              })}
            </Svg>
          </Animated.View>
        )}
      </View>

      {/* Details Section */}
      {selectedCategory && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>{selectedCategory.name}</Text>
            <Text style={styles.detailsSubtitle}>{selectedCategory.count} Active Job Postings</Text>
          </View>
          
          <TouchableOpacity
            style={styles.detailSection}
            onPress={() => toggleDetailSection('description')}
          >
            <View style={styles.detailSectionHeader}>
              <Text style={styles.detailSectionTitle}>Job Description</Text>
              <Ionicons
                name={detailsActive.description ? "chevron-up" : "chevron-down"}
                size={20}
                color="#213E64"
              />
            </View>
            {detailsActive.description && (
              <Text style={styles.detailContent}>{selectedCategory.description}</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.detailSection}
            onPress={() => toggleDetailSection('skills')}
          >
            <View style={styles.detailSectionHeader}>
              <Text style={styles.detailSectionTitle}>Skills</Text>
              <Ionicons
                name={detailsActive.skills ? "chevron-up" : "chevron-down"}
                size={20}
                color="#213E64"
              />
            </View>
            {detailsActive.skills && (
              <View style={styles.skillsList}>
                {selectedCategory.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.detailSection}
            onPress={() => toggleDetailSection('salary')}
          >
            <View style={styles.detailSectionHeader}>
              <Text style={styles.detailSectionTitle}>Wage / Salary</Text>
              <Ionicons
                name={detailsActive.salary ? "chevron-up" : "chevron-down"}
                size={20}
                color="#213E64"
              />
            </View>
            {detailsActive.salary && (
              <Text style={styles.detailContent}>
                Average annual salary range: {selectedCategory.salary}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CareerExplorer;