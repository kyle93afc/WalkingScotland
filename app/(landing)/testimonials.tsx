import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Sarah MacLeod',
        role: 'Highland Walker & Munro Bagger',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        quote: 'Walking Scotland transformed my hill walking experience. The bog factor ratings and detailed route descriptions helped me tackle Ben Nevis safely even in challenging conditions.',
    },
    {
        name: 'James Stewart',
        role: 'Isle of Skye Guide',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        quote: 'As a professional guide, I rely on accurate trail information. The real-time weather updates and community reports have been invaluable for planning safe routes across the Cuillin Ridge.',
    },
    {
        name: 'Fiona Campbell',
        role: 'Cairngorms Explorer',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        quote: 'The interactive maps showing exact waypoints made navigating the Lairig Ghru pass so much easier. Finally found a platform that understands Scottish terrain challenges!',
    },
    {
        name: 'Robert Burns',
        role: 'Southern Uplands Enthusiast',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        quote: 'I\'ve completed over 200 Marilyns using Walking Scotland. The difficulty ratings are spot-on, and being able to track my progress through the different peak categories keeps me motivated.',
    },
    {
        name: 'Morag Henderson',
        role: 'West Highland Way Veteran',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        quote: 'The community aspect is brilliant. Reading other walkers\' reports about conditions on the Devil\'s Staircase helped me choose the perfect day for my traverse.',
    },
    {
        name: 'Calum MacDonald',
        role: 'Hebridean Island Hopper',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        quote: 'Finally, a platform that covers the Scottish Islands properly! The coastal walk descriptions for Harris and Lewis are incredibly detailed, and the tide information is essential.',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-foreground text-4xl font-semibold">Trusted by Scottish Walkers</h2>
                        <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">Join thousands of walkers who rely on Walking Scotland to discover, plan, and share their Scottish adventures safely.</p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index}>
                                        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                                            <Avatar className="size-9">
                                                <AvatarImage
                                                    alt={name}
                                                    src={image}
                                                    loading="lazy"
                                                    width="120"
                                                    height="120"
                                                />
                                                <AvatarFallback>ST</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-medium">{name}</h3>

                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
