import volumeIcon from '../../assets/volume.png';
import { useState } from 'react';
import {
    Wrapper,
    TitleRow,
    Title,
    VolumeIcon,
    Meta,
    Body,
    MetaWrapper
} from './NewsDetailStyle';
import AudioController from './AudioController';



export default function NewsDetail() {
    const [showController, setShowController] = useState(false);

    const title = 'IU is coming with “Three Flower Petals”';
    const publisher = 'Star Today';
    const timeAgo = '1 hour ago';
    const body = `Singer IU is coming.

IU will release her third remake album, “Flower Bookmarks 3,” at 6 p.m. on the 27th through various music sites. This album marks the return of the “Flower Petal” series after about eight years since “Flower Petal Two” in 2017, and it is also her first new release in about a year and three months since her sixth mini-album “The Winning” in February 2024, adding even more significance to it.

“Flower Petal Three” includes a total of six songs, including the title song “Never Ending Story,” “Red Sneakers,” “October 4,” “Last Scene (Feat. Wonstein),” “Beauty (Feat. Balming Tiger),” and “The Dream of a Square.”

In this album, IU has once again reinterpreted classic songs with her own sensibility and lyrical voice while preserving the charm of the original songs. IU, who has received critical acclaim for her diverse remakes of songs such as “Autumn Morning,” “Your Meaning,” and “Sleepless Night, Rain is Falling” in her previous series, is set to showcase her deep, generation-spanning artistry once more.`;

    return (
        <Wrapper>
            <TitleRow>
                <Title>{title}</Title>
            </TitleRow>
            <MetaWrapper>
                <VolumeIcon
                    src={volumeIcon}
                    alt="sound"
                    onClick={() => setShowController(prev => !prev)}
                    style={{ cursor: 'pointer' }}
                />
                {showController && <AudioController />}
                <Meta>
                    <div>{publisher}</div>
                    <div>{timeAgo}</div>
                </Meta>
            </MetaWrapper>

            <Body>{body}</Body>


        </Wrapper>
    );
}