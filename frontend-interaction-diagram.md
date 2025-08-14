```mermaid
flowchart TD
    A["User opens Home Page /"] --> B[WidgetCreationForm]
    B -->|User enters location & submits| C["POST /api/widgets/create-widget"]
    C -->|Success| D["Display success message"]
    C -->|Error| E["Display error message"]

    A --> F["Link to Widget Dashboard /widgets"]

    F --> G[WidgetListPage]
    G -->|Fetch widgets| H["GET /api/widgets"]
    H -->|Returns widget list| G
    G -->|Display widgets| I["WidgetCard for each widget"]

    I -->|Click View Details| J["Widget Details Page /widgets/:id"]
    J -->|Fetch widget| K["GET /api/widgets/:id"]
    K -->|Returns widget| J
    K -->|Error: not found| L["Display 'Widget not found'"]

    I -->|Click Delete| M["Confirm deletion?"]
    M -->|Yes| N["DELETE /api/widgets/:id"]
    N -->|Success| G["WidgetListPage refresh"]
    N -->|Error| O["Alert error message"]

    style A fill:#fef3c7,stroke:#fbbf24,stroke-width:2px
    style G fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style I fill:#e0f2fe,stroke:#0284c7,stroke-width:2px
    style J fill:#ede9fe,stroke:#7c3aed,stroke-width:2px
    ```
