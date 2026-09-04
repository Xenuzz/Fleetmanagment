# Fleet Management Project Architecture

\+

+## Autonomous Agent Architecture

\+

+This project utilizes an autonomous multi-agent development workflow with the following core agents:

\+

+### Core Agents

\+

+| Agent | Type | Technology Stack | Primary Responsibility |

+|-------|------|------------------|------------------------|

+| **Coordinator** | Orchestrator | N/A | Overall task scheduling and workflow orchestration |

+| **Planner** | Planner | N/A | Task decomposition, sequencing, estimation |

+| **Backend Builder** | Builder | Node.js/Express, MongoDB/PostgreSQL | API development, authentication logic |

+| **Frontend Builder** | Builder | React 18+, TypeScript, CSS/Tailwind | UI components, state management |

+| **Android Builder** | Builder | Kotlin, Jetpack Compose, Firebase | Native Android app with real-time tracking |

+| **Database Builder** | Builder | MongoDB/PostgreSQL, Prisma/Mongoose | Schema design, migrations, seeding |

+| **Reviewer** | Reviewer | N/A | Code quality, style enforcement, best practices |

+| **Security Reviewer** | Reviewer | SAST/DAST tools | Security audits, vulnerability assessment |

+| **Tester** | Tester | Jest/Vitest, Cypress/Playwright | Unit/integration/E2E testing |

\+

+## Workflow Diagram

\+

+```mermaid

+graph TD

\+ A[User Request] --> B[Coordinator]

\+ B --> C[Planner - Task Breakdown]

\+ C --> D{Task Type}

\+

\+ D -->|Backend| E[Backend Builder]

\+ D -->|Frontend| F[Frontend Builder]

\+ D -->|Android| G[Android Builder]

\+ D -->|Database| H[Database Builder]

\+

\+ E & F & G & H --> I[Reviewer - Quality Check]

\+ I --> J[Security Reviewer - Audit]

\+ J --> K{Security OK?}

\+ K -->|Yes| L[Tester]

\+ K -->|Critical Issue| M[Immediate Freeze]

\+

\+ L --> N[Coordinator - Merge]

\+

\+ subgraph Project Structure

\+ E

\+ F

\+ G

\+ H

\+ end

+```

\+

+## Project Structure

\+

+```

+Fleetmanagment/

+├── .cline/

+│ └── agents/

+│ ├── Coordinator.md # Agent definition (orchestrator)

+│ ├── Planner.md # Agent definition (planner)

+│ ├── Backend-Builder.md # Agent definition

+│ ├── Frontend-Builder.md # Agent definition

+│ ├── Android-Builder.md # Agent definition

+│ ├── Database-Builder.md # Agent definition

+│ ├── Reviewer.md # Agent definition

+│ ├── Security-Reviewer.md # Agent definition

+│ └── Tester.md # Agent definition

+├── .clinerules/

+│ ├── 10-agent-behavior.md # Communication protocols

+│ ├── 20-project-config.md # Project-wide rules

+│ └── 30-agent-orchestration.md # Workflow diagrams

+├── agents.json # Agent registry (verified)

+├── BUGS.md # Bug tracking log

+├── CHANGELOG.md # Version history

+├── VERSION # Current project version

+├── ARCHITECTURE.md # This file

+└── [source-code/...]

+```

\+

+## Development Workflow

\+

+1. **Initialization**: Coordinator reads agent definitions and project rules

+2. **Planning**: Planner decomposes user requirements into atomic tasks

+3. **Implementation**: Appropriate Builder agents implement their components

+4. **Review**: Reviewer approves code quality; Security Reviewer audits critical code

+5. **Testing**: Tester validates functionality with automated test suites

+6. **Integration**: Coordinator merges approved changes and tracks progress

\+

+## Quality Gates

\+

+- **Before Code Submission**: Style guide compliance, proper error handling, type definitions

+- **Before Merge**: Reviewer approval, security audit passed, tests passing, docs updated

+- **Critical Path**: Security issues trigger immediate freeze and escalation

\+

+## Verification Status

\+

+### Completed ✅

+- [x] All 9 agent definition files created with frontmatter

+- [x] `.clinerules/30-agent-orchestration.md` with workflow diagrams

+- [x] `.clinerules/10-agent-behavior.md` with communication protocols

+- [x] `.cline/agents.json` registry with verified statuses

+- [x] Project version file created (`VERSION: 0.2.0`)

+- [x] Changelog initialized (`CHANGELOG.md`)

+- [x] Bug tracking initialized (`BUGS.md`)

+- [x] ARCHITECTURE.md documented

\+

+### Verification Result: COMPLETE ✅

\+

+All agents registered and ready for autonomous workflow execution.
