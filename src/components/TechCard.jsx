import { useState } from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box
} from '@mui/material'
import { Rocket } from 'lucide-react'

export default function TechCard() {
    const tech = {
        title: 'React 19 + Vite',
        description: 'Современный стек фронтенда',
        category: 'frontend',
        difficulty: 'intermediate',
        status: 'in-progress'
    }

    const getStatusColor = (status) => {
        if (status === 'completed') return 'success'
        if (status === 'in-progress') return 'warning'
        return 'default'
    }

    return (
        <div className="py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                    <Rocket className="text-blue-600" size={32} />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Практика 26 — Material-UI</h2>
                        <p className="text-gray-600 dark:text-gray-300">Карточка технологии с использованием Material-UI</p>
                    </div>
                </div>

                <Box maxWidth="sm" mx="auto">
                    <Card elevation={6}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                {tech.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {tech.description}
                            </Typography>
                            <Chip label={tech.category} color="primary" size="small" sx={{ mr: 1 }} />
                            <Chip label={tech.difficulty} size="small" />
                            <Chip label="В процессе" color={getStatusColor(tech.status)} sx={{ mt: 1 }} />
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained">Редактировать</Button>
                            <Button size="small">Удалить</Button>
                        </CardActions>
                    </Card>
                </Box>
            </div>
        </div>
    )
}