"use client"

import { useMemo, useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

export default function BackgroundParticles() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        parallax: {
                            enable: true,
                            force: 50,
                            smooth: 25
                        }
                    },
                },
            },
            particles: {
                color: {
                    value: "#ddc4ff",
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: { min: 0.1, max: 2 },
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 40,
                },
                opacity: {
                    value: { min: 0.05, max: 0.2 },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            }
        }
        ),
        [],
    );

    if (init) return (
        <div className="fixed inset-0 pointer-events-none">
            <Particles options={options} />
        </div>
    )
}