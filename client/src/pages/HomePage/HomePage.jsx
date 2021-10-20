import { Col, Row } from 'antd'
import React from 'react'
import HotMangaSection from './HotMangaSection/HotMangaSection'
import NewMangaSection from './NewMangaSection'
import TopMangaSection from './TopMangaSection'

export default function HomePage() {
    return (
        <div>
            <HotMangaSection />

            <Row>
                <Col xs={24} sm={24} md={24} lg={18} xl={18}><NewMangaSection /></Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6}><TopMangaSection /></Col>
            </Row>
        </div>
    )
}
