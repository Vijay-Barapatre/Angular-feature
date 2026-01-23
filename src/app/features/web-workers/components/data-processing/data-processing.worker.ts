/// <reference lib="webworker" />

/**
 * Data Processing Web Worker
 * Parses and analyzes CSV/JSON data in background thread
 */

interface WorkerMessage {
    type: 'PARSE_CSV' | 'PARSE_JSON' | 'ANALYZE_DATA';
    data: string;
    options?: {
        delimiter?: string;
        hasHeader?: boolean;
    };
}

addEventListener('message', ({ data }: { data: WorkerMessage }) => {
    const startTime = performance.now();

    try {
        let result;

        switch (data.type) {
            case 'PARSE_CSV':
                result = parseCSV(data.data, data.options);
                break;
            case 'PARSE_JSON':
                result = parseJSON(data.data);
                break;
            case 'ANALYZE_DATA':
                result = analyzeData(data.data);
                break;
            default:
                throw new Error('Unknown operation type');
        }

        const processingTime = Math.round(performance.now() - startTime);

        postMessage({
            type: 'COMPLETE',
            result,
            processingTime
        });
    } catch (error) {
        postMessage({
            type: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

function parseCSV(csvString: string, options?: { delimiter?: string; hasHeader?: boolean }): any {
    const delimiter = options?.delimiter || ',';
    const hasHeader = options?.hasHeader !== false;

    const lines = csvString.trim().split('\n');
    const totalLines = lines.length;

    if (totalLines === 0) {
        return { headers: [], rows: [], stats: {} };
    }

    const headers = hasHeader ? lines[0].split(delimiter).map(h => h.trim()) : [];
    const startIndex = hasHeader ? 1 : 0;
    const rows: any[] = [];

    for (let i = startIndex; i < totalLines; i++) {
        const values = lines[i].split(delimiter).map(v => v.trim());

        if (hasHeader) {
            const row: Record<string, string> = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        } else {
            rows.push(values);
        }

        // Report progress every 1000 rows
        if (i % 1000 === 0) {
            const progress = Math.floor((i / totalLines) * 100);
            postMessage({ type: 'PROGRESS', progress });
        }
    }

    // Calculate stats
    const stats = {
        totalRows: rows.length,
        totalColumns: headers.length || (rows[0]?.length || 0),
        headers: headers
    };

    return { headers, rows, stats };
}

function parseJSON(jsonString: string): any {
    postMessage({ type: 'PROGRESS', progress: 10 });

    const data = JSON.parse(jsonString);

    postMessage({ type: 'PROGRESS', progress: 50 });

    // Analyze structure
    const isArray = Array.isArray(data);
    const length = isArray ? data.length : Object.keys(data).length;
    const sample = isArray ? data.slice(0, 5) : data;

    postMessage({ type: 'PROGRESS', progress: 90 });

    return {
        data,
        stats: {
            isArray,
            length,
            type: typeof data,
            sample
        }
    };
}

function analyzeData(dataString: string): any {
    const data = JSON.parse(dataString);
    const rows = Array.isArray(data) ? data : [data];
    const totalRows = rows.length;

    // Numeric column analysis
    const numericStats: Record<string, { min: number; max: number; avg: number; sum: number }> = {};
    const categoryCounts: Record<string, Record<string, number>> = {};

    if (totalRows > 0 && typeof rows[0] === 'object') {
        const keys = Object.keys(rows[0]);

        keys.forEach(key => {
            const values = rows.map(r => r[key]).filter(v => v !== null && v !== undefined);
            const numericValues = values.filter(v => !isNaN(Number(v))).map(Number);

            if (numericValues.length === values.length && numericValues.length > 0) {
                // Numeric column
                numericStats[key] = {
                    min: Math.min(...numericValues),
                    max: Math.max(...numericValues),
                    sum: numericValues.reduce((a, b) => a + b, 0),
                    avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length
                };
            } else {
                // Categorical column
                categoryCounts[key] = {};
                values.forEach(v => {
                    const strVal = String(v);
                    categoryCounts[key][strVal] = (categoryCounts[key][strVal] || 0) + 1;
                });
            }

            // Report progress
            const progress = Math.floor((keys.indexOf(key) / keys.length) * 100);
            postMessage({ type: 'PROGRESS', progress });
        });
    }

    return {
        totalRows,
        numericStats,
        categoryCounts
    };
}
