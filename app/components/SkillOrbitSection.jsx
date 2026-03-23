import { useEffect, useMemo, useState } from 'react';

function buildOrbitNodes(techProjectionLanes) {
  const nodes = [];

  techProjectionLanes.forEach((lane, laneIndex) => {
    lane.skills.slice(0, 4).forEach((skill, skillIndex) => {
      const energy = Math.max(36, 92 - (laneIndex * 10 + skillIndex * 7));
      nodes.push({
        id: `${lane.title}-${skill}`,
        title: skill,
        lane: lane.title,
        laneIndex,
        energy,
      });
    });
  });

  return nodes.slice(0, 12);
}

export default function SkillOrbitSection({ techProjectionLanes, reduceMotion, resumeMode, isCardMode = false }) {
  const nodes = useMemo(() => buildOrbitNodes(techProjectionLanes), [techProjectionLanes]);
  const [rotation, setRotation] = useState(0);
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? null);

  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0] ?? null;
  const relatedLane = activeNode?.lane;

  useEffect(() => {
    if (reduceMotion || resumeMode || isCardMode || !activeNode) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setRotation((prev) => (prev + 0.35) % 360);
    }, 40);

    return () => window.clearInterval(timer);
  }, [reduceMotion, resumeMode, isCardMode, activeNode]);

  return (
    <section className="mt-10 panel skill-orbit" aria-label="Experimental skill orbit section">
      <p className="skill-orbit__eyebrow">Experimental section</p>
      <h2 className="section-title mb-2">Skill Orbit</h2>
      <p className="skill-orbit__intro">
        A test visualization of capabilities as connected nodes. Keep if this feels distinct, remove if it feels noisy.
      </p>

      <div className="skill-orbit__shell">
        <div className="skill-orbit__desktop" role="presentation">
          <div className="skill-orbit__nebula skill-orbit__nebula--one" />
          <div className="skill-orbit__nebula skill-orbit__nebula--two" />
          <div className="skill-orbit__nebula skill-orbit__nebula--three" />
          <div className="skill-orbit__core" />
          <div className="skill-orbit__core-halo" />
          <div className="skill-orbit__ring" />
          <div className="skill-orbit__ring skill-orbit__ring--outer" />
          <div className="skill-orbit__ring skill-orbit__ring--inner" />

          {nodes.map((node, index) => {
            const angle = ((index / nodes.length) * 360 + rotation) % 360;
            const radius = 150 + (index % 3) * 18;
            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const isActive = node.id === activeNode?.id;
            const isRelated = node.lane === relatedLane;

            return (
              <button
                key={node.id}
                type="button"
                className={`skill-orbit__node ${isActive ? 'skill-orbit__node--active' : ''} ${isRelated ? 'skill-orbit__node--related' : ''}`}
                style={{ transform: `translate(${x}px, ${y}px)`, '--node-energy': `${node.energy}` }}
                onClick={() => setActiveId(node.id)}
                aria-pressed={isActive}
                aria-label={`Focus ${node.title}`}
              >
                <span className="skill-orbit__dot" />
                <span className="skill-orbit__label">{node.title}</span>
              </button>
            );
          })}

          <aside className="skill-orbit__detail">
            {activeNode && (
              <>
                <p className="skill-orbit__detail-lane">{activeNode.lane}</p>
                <h3 className="skill-orbit__detail-title">{activeNode.title}</h3>
                <p className="skill-orbit__detail-copy">
                  Signal strength {activeNode.energy}% in current portfolio scope. Related nodes indicate skills used in the same delivery lane.
                </p>
                <div className="skill-orbit__energy-track" aria-hidden="true">
                  <div className="skill-orbit__energy-fill" style={{ width: `${activeNode.energy}%` }} />
                </div>
                <div className="skill-orbit__lane-mini-list" aria-label="Related lane skills">
                  {(techProjectionLanes.find((lane) => lane.title === activeNode.lane)?.skills ?? []).slice(0, 5).map((skill) => (
                    <span key={skill} className="skill-orbit__lane-mini-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>

        <div className="skill-orbit__mobile">
          {techProjectionLanes.map((lane) => (
            <article key={lane.title} className="skill-orbit__lane-card">
              <h3 className="skill-orbit__lane-title">{lane.title}</h3>
              <div className="skill-orbit__mobile-chips">
                {lane.skills.map((skill) => (
                  <span key={skill} className="skill-orbit__mobile-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
