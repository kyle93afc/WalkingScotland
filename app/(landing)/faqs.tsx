export default function FAQs() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                        <p>Everything you need to know about walking in Scotland</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">Is Walking Scotland free to use?</h3>
                            <p className="text-muted-foreground mt-4">Yes! Walking Scotland is completely free to use. Access all our Scottish walking routes, detailed information, and community features at no cost.</p>

                            <ol className="list-outside list-decimal space-y-2 pl-4">
                                <li className="text-muted-foreground mt-4">Browse over 90 detailed Scottish walking routes without any subscription</li>
                                <li className="text-muted-foreground mt-4">Track your personal walking statistics and achievements</li>
                                <li className="text-muted-foreground mt-4">Share walk reports and experiences with the community</li>
                            </ol>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Do I need special equipment for Scottish walks?</h3>
                            <p className="text-muted-foreground mt-4">Equipment needs vary by walk difficulty and weather. Always check weather conditions and carry appropriate gear for Scottish highlands.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">How accurate are the walk descriptions?</h3>
                            <p className="text-muted-foreground my-4">Our walk data is sourced from WalkHighlands and regularly updated. We provide detailed route information, difficulty ratings, and current conditions.</p>
                            <ul className="list-outside list-disc space-y-2 pl-4">
                                <li className="text-muted-foreground">GPS coordinates and mapping data for precise navigation</li>
                                <li className="text-muted-foreground">Real-time updates from the walking community</li>
                            </ul>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Can I contribute walk reports and photos?</h3>
                            <p className="text-muted-foreground mt-4">Absolutely! Create an account to share your walking experiences, upload photos, and help other walkers with route conditions and tips.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
