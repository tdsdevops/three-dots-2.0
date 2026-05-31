import React from 'react';
import { Box, Container, Card, CardContent, CardActions, Button, Typography } from '@mui/material';

import SEO from '../../components/SEO';
import { Link } from 'react-router';

// Tools page – dark theme with glass‑morphism cards
export default function ToolsPage() {
  const tools = [
    {
      name: 'QR Code Generator',
      description: 'Generate QR codes for any URL or text – free and instant.',
      path: '/tools/qr-generator',
    },
    {
      name: 'Custom Invoice Generator',
      description: 'Create GST-compliant professional invoices and download as PDF instantly for free.',
      path: '/tools/invoice-generator',
    },
    // Future tools can be added here
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#020718', py: { xs: 8, md: 12 } }}>
      <SEO pageKey="tools" />
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ color: '#fff', mb: 4, fontWeight: 800, textAlign: 'center', fontFamily: "DM Sans" }}>
          Tools
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3,1fr)' },
            gap: 4,
          }}
        >
          {tools.map((tool) => (
            <Card
              key={tool.name}
              sx={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: 2,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontFamily: "DM Sans" }}>
                  {tool.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {tool.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  component={Link}
                  to={tool.path}
                  variant="contained"
                  sx={{ background: '#3B6EF8', '&:hover': { background: '#2a5ce8' } }}
                >
                  Open
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
