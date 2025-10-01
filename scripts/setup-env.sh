#!/bin/bash

# Create client/.env with Supabase credentials from secrets
cat > client/.env << EOF
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
EOF

echo "✅ Environment variables configured for client"
