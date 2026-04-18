import { FileItem, AIAction } from '../types';

// ==================== SUPER AI ENGINE ====================
export class SuperAI {
  private currentFile?: FileItem;

  setContext(_files: FileItem[], currentFile?: FileItem) {
    this.currentFile = currentFile;
  }

  async process(message: string): Promise<{
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  }> {
    const lower = message.toLowerCase();

    // ========== CREATE REACT COMPONENT ==========
    if (/(yarat|create|generate|yoz).*(react|component|komponent)/i.test(lower)) {
      const nameMatch = message.match(/(?:komponent|component|nomi|named?)[\s:]*(\w+)/i);
      const name = nameMatch?.[1] || 'MyComponent';
      return this.createReactComponent(name, lower);
    }

    // ========== CREATE API ==========
    if (/(yarat|create|generate).*(api|endpoint|route|backend)/i.test(lower)) {
      return this.createAPI(lower);
    }

    // ========== CREATE PAGE ==========
    if (/(yarat|create|generate).*(page|sahifa|screen|view)/i.test(lower)) {
      const nameMatch = message.match(/(?:page|sahifa|nomi)[\s:]*(\w+)/i);
      return this.createPage(nameMatch?.[1] || 'HomePage');
    }

    // ========== CREATE HOOK ==========
    if (/(yarat|create|generate).*(hook|use\w+)/i.test(lower)) {
      const nameMatch = message.match(/(?:hook|use)[\s:]*(\w+)/i);
      return this.createHook(nameMatch?.[1] || 'Data');
    }

    // ========== CREATE STYLES ==========
    if (/(yarat|create|generate).*(style|css|scss|tailwind)/i.test(lower)) {
      return this.createStyles(lower);
    }

    // ========== CREATE FULL APP ==========
    if (/(yarat|create|generate).*(app|application|ilova|loyiha|project)/i.test(lower)) {
      return this.createFullApp(lower);
    }

    // ========== FIX CODE ==========
    if (/(tuzat|fix|repair|to'g'irla|correct)/i.test(lower)) {
      return this.fixCode();
    }

    // ========== OPTIMIZE ==========
    if (/(optimallashtir|optimize|tezlashtir|improve)/i.test(lower)) {
      return this.optimizeCode();
    }

    // ========== EXPLAIN ==========
    if (/(tushuntir|explain|nima|qanday|what|how)/i.test(lower)) {
      return this.explainCode();
    }

    // ========== ANALYZE ==========
    if (/(tahlil|analyze|tekshir|review|check)/i.test(lower)) {
      return this.analyzeCode();
    }

    // ========== REFACTOR ==========
    if (/(refactor|qayta yoz|rewrite)/i.test(lower)) {
      return this.refactorCode();
    }

    // ========== ADD TYPESCRIPT TYPES ==========
    if (/(type|interface|typescript).*(qosh|add|yoz)/i.test(lower)) {
      return this.addTypes();
    }

    // ========== CREATE TEST ==========
    if (/(yarat|create|generate).*(test|spec|jest|vitest)/i.test(lower)) {
      return this.createTest();
    }

    // ========== INSTALL PACKAGE ==========
    if (/(install|npm|yarn|pnpm|package|kutubxona)/i.test(lower)) {
      const pkgMatch = message.match(/(?:install|npm|package)[\s:]*(\S+)/i);
      return this.installPackage(pkgMatch?.[1] || '');
    }

    // ========== RUN COMMAND ==========
    if (/(run|bajar|ishga tushur|start|dev)/i.test(lower)) {
      return this.runCommand(lower);
    }

    // ========== DELETE FILE ==========
    if (/(o'chir|delete|remove|clean)/i.test(lower)) {
      return this.deleteFile(message);
    }

    // ========== RENAME FILE ==========
    if (/(rename|qayta nomla|yangi nom)/i.test(lower)) {
      return this.renameFile(message);
    }

    // ========== SEARCH & REPLACE ==========
    if (/(almashtir|replace|change|o'zgartir)/i.test(lower)) {
      return this.searchReplace(message);
    }

    // ========== FORMAT CODE ==========
    if (/(format|beautify|prettify)/i.test(lower)) {
      return this.formatCode();
    }

    // ========== ADD COMMENTS ==========
    if (/(comment|izoh|document)/i.test(lower)) {
      return this.addComments();
    }

    // ========== CONVERT LANGUAGE ==========
    if (/(convert|o'zgartir).*(js|ts|jsx|tsx)/i.test(lower)) {
      return this.convertLanguage(lower);
    }

    // ========== GENERIC RESPONSE ==========
    return {
      response: `🤔 Buyruqni to'liq tushunmadim.\n\nQuyidagi buyruqlardan foydalaning:\n\n**Yaratish:**\n• "React komponent yarat: Button"\n• "API endpoint yarat"\n• "Hook yarat: useAuth"\n• "Page yarat: Dashboard"\n• "To'liq ilova yarat"\n\n**Tahrirlash:**\n• "Kodni tuzat"\n• "Kodni optimallashtir"\n• "Type qo'sh"\n• "Comment yoz"\n\n**Boshqa:**\n• "Kodni tahlil qil"\n• "Kodni tushuntir"\n• "Test yarat"\n• "npm install axios"`,
      actions: [],
      codeBlocks: []
    };
  }

  // ========== CREATE REACT COMPONENT ==========
  private createReactComponent(name: string, lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const withProps = /prop|props|props/i.test(lower);
    const withState = /state|holat|usestate/i.test(lower);
    const withEffect = /effect|useeffect|lifecycle/i.test(lower);
    const withCallback = /callback|usecallback|memo/i.test(lower);
    const withStyles = /style|css|tailwind|styled/i.test(lower);

    let imports = "import React";
    if (withState) imports += ", { useState }";
    if (withEffect) imports += withState ? ", { useEffect }" : ", { useEffect }";
    if (withCallback) imports += ", { useCallback }";
    imports += " from 'react';";

    if (withStyles) imports += "\nimport './" + name + ".css';";

    let propsInterface = '';
    let propsParam = '';
    if (withProps) {
      propsInterface = `\n\ninterface ${name}Props {\n  /** Komponent sarlavhasi */\n  title: string;\n  /** Tavsif matni */\n  description?: string;\n  /** Bosilganda ishga tushuvchi funksiya */\n  onAction?: () => void;\n  /** Yopiq holat */\n  isOpen?: boolean;\n}`;
      propsParam = `props: ${name}Props`;
    }

    let stateCode = '';
    if (withState) {
      stateCode = `\n  // State\n  const [count, setCount] = useState<number>(0);\n  const [loading, setLoading] = useState<boolean>(false);\n  const [error, setError] = useState<string | null>(null);`;
    }

    let effectCode = '';
    if (withEffect) {
      effectCode = `\n\n  // Lifecycle\n  useEffect(() => {\n    // Komponent yuklanganda ishga tushadi\n    console.log('${name} mounted');\n    \n    // Tozalash funksiyasi\n    return () => {\n      console.log('${name} unmounted');\n    };\n  }, []);`;
    }

    let callbackCode = '';
    if (withCallback) {
      callbackCode = `\n\n  // Memoized handlers\n  const handleClick = useCallback(() => {\n    ${withState ? 'setCount(prev => prev + 1);' : ''}\n    ${withProps ? 'props.onAction?.();' : ''}\n  }, [${withProps ? 'props.onAction' : ''}]);`;
    }

    const code = `${imports}${propsInterface}

/**
 * ${name} komponenti
 * ${withProps ? '\n * @param props - Komponent parametrlari' : ''}
 */
export const ${name}: React.FC${withProps ? `<${name}Props>` : ''} = (${propsParam}) => {${stateCode}${effectCode}${callbackCode}

  return (
    <div className="${name.toLowerCase()}-container">${withProps ? '\n      <h2 className="text-2xl font-bold">{props.title}</h2>' : `\n      <h2 className="text-2xl font-bold">${name}</h2>`}
      ${withProps ? '{props.description && <p className="mt-2 text-gray-600">{props.description}</p>}' : ''}
      ${withState ? '\n      <p className="mt-4">Count: {count}</p>' : ''}
      <button
        onClick={${withCallback ? 'handleClick' : withProps ? 'props.onAction' : '() => {}'}}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click
      </button>
    </div>
  );
};`;

    return {
      response: `✅ **${name}** komponenti tayyor!\n\n📁 \`src/components/${name}.tsx\`\n\n🔹 Xususiyatlar:${withProps ? '\n  • Props bilan ishlaydi' : ''}${withState ? '\n  • State boshqaruvi' : ''}${withEffect ? '\n  • useEffect lifecycle' : ''}${withCallback ? '\n  • useCallback optimallashtirish' : ''}${withStyles ? '\n  • CSS moduli' : ''}\n\n💾 Faylni yaratishni xohlaysizmi?`,
      actions: [{
        type: 'create_file',
        filename: `src/components/${name}.tsx`,
        content: code,
        description: `Create ${name}.tsx`
      }],
      codeBlocks: [{ language: 'typescript', code, filename: `${name}.tsx` }]
    };
  }

  // ========== CREATE API ==========
  private createAPI(_lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const code = `import express, { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';

const router: Router = express.Router();

// Middleware - xatolarni tekshirish
const handleValidationErrors = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ============================================
// GET /api/items - Barcha elementlarni olish
// ============================================
router.get('/items', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const items = await getItemsFromDatabase({
      page: Number(page),
      limit: Number(limit),
      search: search as string
    });

    res.json({
      success: true,
      data: items,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: items.length
      }
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch items'
    });
  }
});

// ============================================
// GET /api/items/:id - Bitta elementni olish
// ============================================
router.get('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch item'
    });
  }
});

// ============================================
// POST /api/items - Yangi element yaratish
// ============================================
router.post('/items',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    handleValidationErrors
  ],
  async (req: Request, res: Response) => {
    try {
      const newItem = await createItem(req.body);
      res.status(201).json({
        success: true,
        data: newItem,
        message: 'Item created successfully'
      });
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(400).json({
        success: false,
        error: 'Failed to create item'
      });
    }
  }
);

// ============================================
// PUT /api/items/:id - Elementni yangilash
// ============================================
router.put('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedItem = await updateItem(id, req.body);

    res.json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update item'
    });
  }
});

// ============================================
// DELETE /api/items/:id - Elementni o'chirish
// ============================================
router.delete('/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteItem(id);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete item'
    });
  }
});

// ============================================
// Mock Database Functions
// ============================================
interface GetItemsOptions {
  page: number;
  limit: number;
  search?: string;
}

async function getItemsFromDatabase(options: GetItemsOptions) {
  const allItems = [
    { id: '1', name: 'Item 1', description: 'Description 1' },
    { id: '2', name: 'Item 2', description: 'Description 2' },
    { id: '3', name: 'Item 3', description: 'Description 3' },
  ];

  let items = allItems;

  if (options.search) {
    items = items.filter(item =>
      item.name.toLowerCase().includes(options.search!.toLowerCase())
    );
  }

  const start = (options.page - 1) * options.limit;
  const end = start + options.limit;

  return items.slice(start, end);
}

async function getItemById(id: string) {
  return { id, name: 'Item ' + id, description: 'Description' };
}

async function createItem(data: any) {
  return { id: String(Date.now()), ...data, createdAt: new Date() };
}

async function updateItem(id: string, data: any) {
  return { id, ...data, updatedAt: new Date() };
}

async function deleteItem(_id: string) {
  return true;
}

export default router;`;

    return {
      response: `✅ **Express.js API** tayyor!\n\n📁 \`src/routes/api.ts\`\n\n🔹 Endpointlar:\n  • GET /api/items - Barcha elementlar (pagination, search)\n  • GET /api/items/:id - Bitta element\n  • POST /api/items - Yaratish (validation bilan)\n  • PUT /api/items/:id - Yangilash\n  • DELETE /api/items/:id - O'chirish\n\n📦 Kerakli paketlar:\n  \`npm install express express-validator\``,
      actions: [{
        type: 'create_file',
        filename: 'src/routes/api.ts',
        content: code,
        description: 'Create API router'
      }],
      codeBlocks: [{ language: 'typescript', code, filename: 'api.ts' }]
    };
  }

  // ========== CREATE PAGE ==========
  private createPage(name: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const code = `import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

/**
 * ${name} sahifasi
 */
export const ${name}: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ma'lumotlarni yuklash
    const loadData = async () => {
      try {
        setIsLoading(true);
        // API chaqiruvi...
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>${name} | My App</title>
        <meta name="description" content="${name} sahifasi" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              ${name}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Bu sahifa tavsifi. O'zingizga mos matn yozing.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Bosh sahifa
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">Sarlavha</h2>
              <p className="text-gray-600">
                Bu yerda asosiy kontent bo'ladi.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};`;

    return {
      response: `✅ **${name}** sahifasi tayyor!\n\n📁 \`src/pages/${name}.tsx\`\n\n🔹 Xususiyatlar:\n  • React Router bilan integratsiya\n  • Helmet SEO optimallashtirish\n  • Loading holati\n  • Responsive design\n  • Gradient hero section`,
      actions: [{
        type: 'create_file',
        filename: `src/pages/${name}.tsx`,
        content: code,
        description: `Create ${name}.tsx`
      }],
      codeBlocks: [{ language: 'typescript', code, filename: `${name}.tsx` }]
    };
  }

  // ========== CREATE HOOK ==========
  private createHook(name: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const hookName = name.startsWith('use') ? name : `use${name}`;

    const code = `import { useState, useEffect, useCallback } from 'react';

interface Use${name}Options {
  /** Boshlang'ich qiymat */
  initialValue?: any;\n  /** Kechikish vaqti (ms) */
  delay?: number;\n}

interface Use${name}Return {
  /** Joriy qiymat */
  value: any;\n  /** Qiymatni o'zgartirish */
  setValue: (value: any) => void;\n  /** Yuklanish holati */
  isLoading: boolean;\n  /** Xato holati */
  error: Error | null;\n  /** Qayta yuklash */
  refetch: () => void;\n}

/**
 * ${hookName} hook
 * \n * @example\n * const { value, isLoading, error } = ${hookName}({ initialValue: [] });\n */
export function ${hookName}(options: Use${name}Options = {}): Use${name}Return {
  const { initialValue, delay = 0 } = options;

  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Kechikish (agar kerak bo'lsa)
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Ma'lumotlarni olish
      // const response = await api.get('/data');
      // setValue(response.data);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [delay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    value,
    setValue,
    isLoading,
    error,
    refetch,
  };
}`;

    return {
      response: `✅ **${hookName}** hook tayyor!\n\n📁 \`src/hooks/${hookName}.ts\`\n\n🔹 Xususiyatlar:\n  • TypeScript bilan to'liq tipizatsiya\n  • Loading va error holatlari\n  • refetch funksiyasi\n  • Kechikish parametri`,
      actions: [{
        type: 'create_file',
        filename: `src/hooks/${hookName}.ts`,
        content: code,
        description: `Create ${hookName}.ts`
      }],
      codeBlocks: [{ language: 'typescript', code, filename: `${hookName}.ts` }]
    };
  }

  // ========== CREATE STYLES ==========
  private createStyles(_lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const code = `/* ============================================
   Global Styles
   ============================================ */

/* CSS Variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;

  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;

  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-dark: #111827;

  --border-radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Base */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  line-height: 1.5;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

/* Cards */
.card {
  background: var(--bg-primary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
}

/* Form Elements */
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Utilities */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.p-4 { padding: 1rem; }`;

    return {
      response: `✅ **Global Styles** tayyor!\n\n📁 \`src/styles/globals.css\`\n\n🔹 Xususiyatlar:\n  • CSS Variables\n  • Reset styles\n  • Button components\n  • Card components\n  • Form elements\n  • Utility classes`,
      actions: [{
        type: 'create_file',
        filename: 'src/styles/globals.css',
        content: code,
        description: 'Create globals.css'
      }],
      codeBlocks: [{ language: 'css', code, filename: 'globals.css' }]
    };
  }

  // ========== CREATE FULL APP ==========
  private createFullApp(_lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const actions: AIAction[] = [];

    // App.tsx
    actions.push({
      type: 'create_file',
      filename: 'src/App.tsx',
      content: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import './styles/globals.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;`,
      description: 'Create App.tsx'
    });

    // Layout
    actions.push({
      type: 'create_file',
      filename: 'src/components/Layout.tsx',
      content: `import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};`,
      description: 'Create Layout.tsx'
    });

    // Navbar
    actions.push({
      type: 'create_file',
      filename: 'src/components/Navbar.tsx',
      content: `import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyApp</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
};`,
      description: 'Create Navbar.tsx'
    });

    // Footer
    actions.push({
      type: 'create_file',
      filename: 'src/components/Footer.tsx',
      content: `import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>&copy; 2024 MyApp. All rights reserved.</p>
    </footer>
  );
};`,
      description: 'Create Footer.tsx'
    });

    // HomePage
    actions.push({
      type: 'create_file',
      filename: 'src/pages/HomePage.tsx',
      content: `import React from 'react';
import { Helmet } from 'react-helmet-async';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home | MyApp</title>
      </Helmet>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">Welcome to MyApp</h1>
      </div>
    </>
  );
};`,
      description: 'Create HomePage.tsx'
    });

    // AboutPage
    actions.push({
      type: 'create_file',
      filename: 'src/pages/AboutPage.tsx',
      content: `import React from 'react';
import { Helmet } from 'react-helmet-async';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | MyApp</title>
      </Helmet>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">About Us</h1>
      </div>
    </>
  );
};`,
      description: 'Create AboutPage.tsx'
    });

    return {
      response: `🚀 **To'liq React ilovasi** yaratildi!\n\n📁 Yaratilgan fayllar:\n  • src/App.tsx\n  • src/components/Layout.tsx\n  • src/components/Navbar.tsx\n  • src/components/Footer.tsx\n  • src/pages/HomePage.tsx\n  • src/pages/AboutPage.tsx\n\n📦 Kerakli paketlar:\n  \`npm install react-router-dom react-helmet-async @tanstack/react-query\``,
      actions,
      codeBlocks: []
    };
  }

  // ========== FIX CODE ==========
  private fixCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return {
        response: '❌ Avval faylni oching.',
        actions: [],
        codeBlocks: []
      };
    }

    let fixed = this.currentFile.content;
    const fixes: string[] = [];

    if (fixed.match(/\bvar\s+/)) {
      fixed = fixed.replace(/\bvar\b/g, 'const');
      fixes.push('✓ var → const');
    }

    if (fixed.match(/console\.log\(/)) {
      fixed = fixed.replace(/console\.log\([^)]+\);?\n?/g, '');
      fixes.push('✓ console.log olib tashlandi');
    }

    if (fixed.match(/==(?!=)/)) {
      fixed = fixed.replace(/==(?!=)/g, '===');
      fixes.push('✓ == → ===');
    }

    if (fixed.match(/:\s*any/)) {
      fixed = fixed.replace(/:\s*any/g, ': unknown');
      fixes.push('✓ any → unknown');
    }

    return {
      response: `✅ **${this.currentFile.name}** tuzatildi!\n\n${fixes.join('\n') || 'Kod allaqachon toza!'}`,
      actions: [{
        type: 'edit_file',
        filename: this.currentFile.name,
        content: fixed,
        description: `Fix ${this.currentFile.name}`
      }],
      codeBlocks: [{ language: this.currentFile.language, code: fixed }]
    };
  }

  // ========== OPTIMIZE CODE ==========
  private optimizeCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return {
        response: '❌ Avval faylni oching.',
        actions: [],
        codeBlocks: []
      };
    }

    let optimized = this.currentFile.content;
    const optimizations: string[] = [];

    if (optimized.match(/console\.log\(/)) {
      optimized = optimized.replace(/console\.log\([^)]+\);?\n?/g, '');
      optimizations.push('✓ console.log olib tashlandi');
    }

    return {
      response: `⚡ **${this.currentFile.name}** optimallashtirildi!\n\n${optimizations.join('\n') || 'Kod allaqachon optimal!'}`,
      actions: [{
        type: 'edit_file',
        filename: this.currentFile.name,
        content: optimized,
        description: `Optimize ${this.currentFile.name}`
      }],
      codeBlocks: [{ language: this.currentFile.language, code: optimized }]
    };
  }

  // ========== EXPLAIN CODE ==========
  private explainCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return {
        response: '❌ Avval faylni oching.',
        actions: [],
        codeBlocks: []
      };
    }

    const lines = this.currentFile.content.split('\n').length;
    const functions = (this.currentFile.content.match(/function|=>/g) || []).length;

    return {
      response: `📖 **${this.currentFile.name}** tavsifi:\n\n• Qatorlar: ${lines}\n• Funksiyalar: ${functions}\n• Tili: ${this.currentFile.language}`,
      actions: [],
      codeBlocks: []
    };
  }

  // ========== ANALYZE CODE ==========
  private analyzeCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return {
        response: '❌ Avval faylni oching.',
        actions: [],
        codeBlocks: []
      };
    }

    const issues: string[] = [];

    if (this.currentFile.content.match(/console\.log\(/)) {
      issues.push('⚠️ console.log mavjud');
    }
    if (this.currentFile.content.match(/\bvar\s+/)) {
      issues.push('⚠️ var ishlatilgan');
    }

    return {
      response: issues.length > 0
        ? `🔍 Topilgan muammolar:\n${issues.join('\n')}`
        : '✅ Kodda muammolar yo\'q!',
      actions: [],
      codeBlocks: []
    };
  }

  // ========== REFACTOR ==========
  private refactorCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return { response: '❌ Avval faylni oching.', actions: [], codeBlocks: [] };
    }
    let code = this.currentFile.content;
    let modified = false;

    // Convert regular functions to arrow functions
    if (/function\s+\w+\s*\(/.test(code)) {
      code = code.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*\{/g, 'const $1 = ($2) => {');
      modified = true;
    }

    // Convert string concatenation to template literals
    if (/['"]\s*\+\s*\w+\s*\+\s*['"]/.test(code)) {
      code = code.replace(/['"](.*?)['"]\s*\+\s*(\w+)\s*\+\s*['"](.*?)['"]/g, '`$1${$2}$3`');
      modified = true;
    }

    return {
      response: modified
        ? `🔄 **${this.currentFile.name}** refactor qilindi!\n\n✓ Arrow funksiyalarga o'tkazildi\n✓ Zamonaviy ES6 sintaksisi qo'llanildi.`
        : `✅ **${this.currentFile.name}** allaqachon yaxshi holatda, refactor shart emas.`,
      actions: modified ? [{
        type: 'edit_file',
        content: code,
        description: `Refactor ${this.currentFile.name}`
      }] : [],
      codeBlocks: modified ? [{ language: this.currentFile.language, code: code }] : []
    };
  }

  // ========== ADD TYPES ==========
  private addTypes(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return { response: '❌ Avval faylni oching.', actions: [], codeBlocks: [] };
    }
    let code = this.currentFile.content;
    let modified = false;

    if (code.includes('any')) {
      code = code.replace(/:\s*any/g, ': unknown');
      modified = true;
    }

    // Add type to arrow functions args implicitly
    if (/const\s+\w+\s*=\s*\(\s*(\w+)\s*\)\s*=>/.test(code)) {
       code = code.replace(/const\s+(\w+)\s*=\s*\(\s*(\w+)\s*\)\s*=>/g, 'const $1 = ($2: any) =>');
       modified = true;
    }

    if (!code.includes('interface') && !code.includes('type ')) {
       const interfaceName = this.currentFile.name.split('.')[0].replace(/[^a-zA-Z]/g, '') + 'Props';
       code = `interface ${interfaceName} {\n  id?: string;\n  name?: string;\n}\n\n` + code;
       modified = true;
    }

    return {
      response: modified
        ? `📝 **${this.currentFile.name}** fayliga turlar (Typescript types/interfaces) qo'shildi!`
        : `✅ Turlar allaqachon mavjud yoki qo'shishning imkoni yo'q.`,
      actions: modified ? [{
        type: 'edit_file',
        content: code,
        description: `Add types to ${this.currentFile.name}`
      }] : [],
      codeBlocks: modified ? [{ language: this.currentFile.language, code }] : []
    };
  }

  // ========== CREATE TEST ==========
  private createTest(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const filename = this.currentFile ? this.currentFile.name.split('.')[0] : 'example';
    const code = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ${filename} } from '../${filename}';

describe('${filename} Component', () => {
  it('renders correctly', () => {
    render(<${filename} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('handles click events', () => {
    // Add specific test logic
  });
});`;

    return {
      response: `✅ **Test fayli** tayyor!\n\n📁 \`src/__tests__/${filename}.test.tsx\``,
      actions: [{
        type: 'create_file',
        filename: `src/__tests__/${filename}.test.tsx`,
        content: code,
        description: `Create ${filename}.test.tsx`
      }],
      codeBlocks: [{ language: 'typescript', code, filename: `${filename}.test.tsx` }]
    };
  }

  // ========== INSTALL PACKAGE ==========
  private installPackage(pkg: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    return {
      response: pkg
        ? `📦 Dasturni o'rnatmoqchiman. Terminalda \`npm install ${pkg}\` buyrug'i bajariladi.`
        : 'Qaysi paketni o\'rnatishni xohlaysiz? Qaytadan kiriting (Masalan: npm install axios)',
      actions: pkg ? [{
        type: 'run_command',
        command: `npm install ${pkg}`,
        description: `Install ${pkg}`
      }] : [],
      codeBlocks: []
    };
  }

  // ========== RUN COMMAND ==========
  private runCommand(lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    let command = 'npm run dev';
    if (lower.includes('build')) command = 'npm run build';
    if (lower.includes('test')) command = 'npm test';
    if (lower.includes('lint')) command = 'npm run lint';

    return {
      response: `▶️ Dastur ishga tushirilmoqda: \`${command}\``,
      actions: [{
        type: 'run_command',
        command,
        description: `Run ${command}`
      }],
      codeBlocks: []
    };
  }

  // ========== DELETE FILE ==========
  private deleteFile(message: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const fileMatch = message.match(/(?:o'chir|delete|remove)\s+(\S+)/i);
    const filename = fileMatch?.[1];

    if (filename) {
       return {
         response: `🗑️ **${filename}** muvaffaqiyatli o'chirildi!`,
         actions: [{
           type: 'delete_file',
           filename,
           description: `Delete ${filename}`
         }],
         codeBlocks: []
       };
    } else if (this.currentFile) {
       return {
         response: `🗑️ Joriy **${this.currentFile.name}** o'chirilmoqda.`,
         actions: [{
           type: 'delete_file',
           filename: this.currentFile.name,
           description: `Delete ${this.currentFile.name}`
         }],
         codeBlocks: []
       };
    }

    return {
      response: 'Qaysi faylni o\'chirishni xohlaysiz? Aniqroq yozing.',
      actions: [],
      codeBlocks: []
    };
  }

  // ========== RENAME FILE ==========
  private renameFile(message: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    const match = message.match(/(?:nomla|qayta nomla|rename)\s+(\S+)\s+(?:ga|to)\s+(\S+)/i);
    if (match) {
       return {
         response: `📝 Fayl nomi **${match[1]}** dan **${match[2]}** ga o'zgartirilmoqda.`,
         actions: [{
           type: 'rename_file',
           filename: match[1],
           newName: match[2],
           description: `Rename ${match[1]} to ${match[2]}`
         }],
         codeBlocks: []
       };
    }

    if (this.currentFile) {
       const newNameMatch = message.match(/(?:nomi|yangi nom)\s+(\S+)/i) || message.match(/rename\s+(?:to\s+)?(\S+)/i);
       if (newNameMatch && newNameMatch[1]) {
         return {
           response: `📝 Joriy fayl nomini **${newNameMatch[1]}** ga o'zgartirmoqdaman.`,
           actions: [{
             type: 'rename_file',
             filename: this.currentFile.name,
             newName: newNameMatch[1],
             description: `Rename to ${newNameMatch[1]}`
           }],
           codeBlocks: []
         };
       }
    }

    return {
      response: '📝 Faylni qayta nomlash uchun eski va yangi nomni ayting. Masalan: "app.js ni main.js ga o\'zgartir" yoki faylni ochiq holda "yangi nom main.js" deng.',
      actions: [],
      codeBlocks: []
    };
  }

  // ========== SEARCH & REPLACE ==========
  private searchReplace(message: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return { response: '❌ Avval almashtirish kerak bo\'lgan faylni oching.', actions: [], codeBlocks: [] };
    }

    // Matnni tirnoqlar orqali ushlash: 'a' ni 'b' ga yoki "a" bilan "b" ni
    const match = message.match(/['"]([^'"]+)['"]\s*(?:ni|bilan|ga)\s*['"]([^'"]+)['"]/i);

    if (match) {
      const searchStr = match[1];
      const replaceStr = match[2];
      const code = this.currentFile.content.split(searchStr).join(replaceStr);

      return {
        response: `🔍 Quyidagi o'zgarishlar amalga oshirildi:\n**${searchStr}** so'zi **${replaceStr}** ga almashtirildi.`,
        actions: [{
          type: 'edit_file',
          content: code,
          description: `Replace ${searchStr} with ${replaceStr}`
        }],
        codeBlocks: [{ language: this.currentFile.language, code }]
      };
    }

    return {
      response: '🔍 Qaysi matnni nimaga almashtirishni istaysiz? Masalan: "EskiMatn" ni "YangiMatn" ga almashtir.',
      actions: [],
      codeBlocks: []
    };
  }

  // ========== FORMAT CODE ==========
  private formatCode(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    return {
      response: '✨ Kod formati (Prettier orqali) tartiblanmoqda...',
      actions: [{
        type: 'run_command',
        command: 'npx prettier --write .',
        description: 'Format code with Prettier'
      }],
      codeBlocks: []
    };
  }

  // ========== ADD COMMENTS ==========
  private addComments(): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return { response: '❌ Annotatsiya va kompyuter izohlarini qo\'shish uchun avval faylni oching.', actions: [], codeBlocks: [] };
    }
    let code = this.currentFile.content;
    const isJS = ['typescript', 'javascript'].includes(this.currentFile.language);

    if (isJS) {
       // Add JSDoc to functions gently
       if (code.includes('function ') || code.includes('=>')) {
           code = code.replace(/(export\s+)?(const|let|var)\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>/g, '\n/**\n * $3 xizmat funksiyasi.\n */\n$1$2 $3 = $4');
           code = code.replace(/(export\s+)?function\s+(\w+)\s*\(/g, '\n/**\n * $2 asosiy funksiya.\n */\n$1function $2(');
       }

       return {
         response: `📝 **${this.currentFile.name}** fayliga batafsil dokumentatsiya (JSDoc izohlari) qo'shildi!`,
         actions: [{ type: 'edit_file', content: code, description: 'Add code comments' }],
         codeBlocks: [{ language: this.currentFile.language, code }]
       };
    }

    return {
      response: '📝 Comment qo\'shish uchun JS / TS / JSX turdagi faylni oching.',
      actions: [],
      codeBlocks: []
    };
  }

  // ========== CONVERT LANGUAGE ==========
  private convertLanguage(lower: string): {
    response: string;
    actions: AIAction[];
    codeBlocks: { language: string; code: string; filename?: string }[];
  } {
    if (!this.currentFile) {
      return { response: '❌ Tahrirlash uchun avval faylni oching.', actions: [], codeBlocks: [] };
    }

    const toTS = lower.includes('ts') || lower.includes('typescript');
    const newExt = toTS ? 'ts' : 'js';
    const oldNameParts = this.currentFile.name.split('.');
    oldNameParts.pop();
    const newName = `${oldNameParts.join('.')}.${newExt}`;

    return {
      response: `🔄 **${this.currentFile.name}** fayli **${newName}** deb o'zgartirilmoqda.`,
      actions: [{
        type: 'rename_file',
        filename: this.currentFile.name,
        newName: newName,
        description: `Convert to ${newExt}`
      }],
      codeBlocks: []
    };
  }
}
