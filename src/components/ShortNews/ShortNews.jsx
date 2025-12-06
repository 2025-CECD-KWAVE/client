import React, { useEffect, useRef, useState } from "react";

import {
    Container,
    Header,
    Thumbnail,
    ContentWrapper,
    NewsTitle,
    TimeText,
    Body,
} from "./ShortNewsStyle";

export default function ShortNews() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const containerRef = useRef(null);

    const mockNewsList = [
        {
            title: "aespa Completes Promotions and Prepares for Their Next Era",
            body: `Aespa wrapped up promotions for their latest single, showcasing powerful performances and strong chart achievements. 
The group is now preparing for a new musical direction that fans are eagerly anticipating. 
Members shared that they have been experimenting with new sounds in the studio recently. 
Their agency hinted that a major announcement will be coming soon.`,
            time: "1 hour ago",
            thumbnail: "https://newsimg-hams.hankookilbo.com/2024/06/26/1fd86784-3f90-439e-b722-ceef29253ca3.jpg",
        },
        {
            title: "NewJeans Sets Record With Global Streaming Milestone",
            body: `NewJeans has surpassed a major global streaming milestone, solidifying their impact on the international music scene. 
Industry analysts predict the group will continue breaking records throughout the year. 
The achievement has sparked renewed interest in their previous releases. 
Fans worldwide are celebrating the milestone with global streaming events.`,
            time: "3 hours ago",
            thumbnail: "https://img.seoul.co.kr/img/upload/2025/11/27/SSC_20251127152219.jpg.webp",
        },
        {
            title: "LE SSERAFIM Announces Surprise Comeback in Early Spring",
            body: `LE SSERAFIM has officially confirmed a surprise comeback scheduled for early spring. 
The group is expected to showcase a bold new concept that highlights their evolving musical identity. 
Production staff revealed that the new album will include a mix of energetic tracks and emotional ballads. 
Fans are already expressing excitement about what new style the group will reveal.`,
            time: "6 hours ago",
            thumbnail: "https://www.atstar1.com/news/photo/202504/6022817_89224_4842.jpg",
        },
        {
            title: "IVE to Release Special Digital Single Ahead of World Tour",
            body: `IVE is preparing to release a special digital single ahead of their world tour kickoff. 
According to Starship Entertainment, the track will capture the energetic spirit of their live performances. 
The members described the song as something that will bring fans and artists closer than ever. 
The world tour is expected to be the group's largest production to date.`,
            time: "9 hours ago",
            thumbnail: "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2025/02/14/91d34e38-08f1-489e-b8c6-2c35571762d8.jpg",
        },
        {
            title: "Stray Kids Reveals Behind-the-Scenes Footage From Award Show",
            body: `Stray Kids shared exclusive behind-the-scenes footage from their recent award show appearance. 
The video highlights their teamwork, excitement, and preparation leading up to the stage. 
Viewers also got a glimpse of humorous moments that showcased the group's close bond. 
The footage quickly gained millions of views across social platforms.`,
            time: "Yesterday",
            thumbnail: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202412/24/8cb6fdac-19cd-4a76-89ed-d61ef5f475fc.jpg",
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setItems(mockNewsList);
            setIsLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        const onPointerDown = (e) => {
            isDragging = true;
            startY = e.clientY;
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            currentY = e.clientY;
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            const delta = currentY - startY;
            const threshold = 80;

            if (delta > threshold) {
                container.scrollBy({
                    top: -window.innerHeight,
                    behavior: "smooth",
                });
            } else if (delta < -threshold) {
                container.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth",
                });
            }

            isDragging = false;
            startY = 0;
            currentY = 0;
        };

        container.addEventListener("pointerdown", onPointerDown);
        container.addEventListener("pointermove", onPointerMove);
        container.addEventListener("pointerup", onPointerUp);
        container.addEventListener("pointerleave", onPointerUp);

        return () => {
            container.removeEventListener("pointerdown", onPointerDown);
            container.removeEventListener("pointermove", onPointerMove);
            container.removeEventListener("pointerup", onPointerUp);
            container.removeEventListener("pointerleave", onPointerUp);
        };
    }, []);

    if (isLoading) {
        return <div style={{ height: "100vh", background: "#e0e0e0" }} />;
    }

    return (
        <div
            ref={containerRef}
            className="shorts-container"
            style={{
                height: "100vh",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                position: "relative",
                touchAction: "none",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            {items.map((data, i) => (
                <section
                    key={i}
                    style={{
                        height: "100vh",
                        scrollSnapAlign: "start",
                        overflow: "hidden",
                        background: "#fff",
                    }}
                >
                    <Container>
                        <Header>Short News</Header>
                        <Thumbnail src={data.thumbnail} alt="thumbnail" />
                        <ContentWrapper>
                            <NewsTitle>{data.title}</NewsTitle>
                            <TimeText>{data.time}</TimeText>
                            <Body>{data.body}</Body>
                        </ContentWrapper>
                    </Container>
                </section>
            ))}
        </div>
    );
}
