                                                                /* ===================== IMPORTS ====================== */
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion  } from "framer-motion";


                                                                /* ==================== COMPONENTS ==================== */

                                                                /* --------------- PARTICLES BACKGROUND --------------- */
function ParticlesBackground() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 2 }}
		>
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={{
					fpsLimit: 120,
					interactivity: {
						events: {
							onClick: {
								enable: true,
								mode: "push"
							},
							onHover: {
								enable: true,
								mode: "repulse"
							},
							resize: true
						},
						modes: {
							push: {
								quantity: 4
							},
							repulse: {
								distance: 80,
								duration: 0.4
							}
						}
					},
					particles: {
						color: {
							value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
						},
						links: {
							color: "#808080",
							distance: 150,
							enable: true,
							opacity: 0.3,
							width: 1
						},
						collisions: {
							enable: true
						},
						move: {
							direction: "none",
							enable: true,
							outModes: {
								default: "bounce"
							},
							random: false,
							speed: 1,
							straight: false
						},
						number: {
							density: {
								enable: true,
								area: 800
							},
							value: 80
						},
						opacity: {
							value: 0.5
						},
						shape: {
							type: "circle"
						},
						size: {
							value: { min: 1, max: 5 }
						}
					},
					detectRetina: true
				}}
			/>
		</motion.div>
	);
}


                                                                /* ===================== EXPORTS ====================== */
export default ParticlesBackground;
